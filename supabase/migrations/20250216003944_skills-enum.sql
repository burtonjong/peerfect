-- Drop dependent objects first
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists handle_new_user();

-- Drop tables that depend on user_profiles
drop table if exists messages;
drop table if exists conversations;
drop table if exists posts;

-- Drop the user_profiles table (if it exists)
drop table if exists user_profiles;

-- Drop the skills table (if it exists)
drop table if exists skills;

-- Create the skill_enum type
create type skill_enum as enum (
  'Laundry',
  'Finances',
  'Cooking',
  'Cleaning',
  'Gardening',
  'Programming',
  'Design',
  'Tutoring',
  'Repairs',
  'Fitness'
);

-- Recreate user_profiles table
create table user_profiles (
  id uuid references auth.users(id) on delete cascade not null unique,
  username text unique not null,
  email text unique not null,
  points integer default 100 check (points >= 0),
  skills_needed skill_enum[] default array[]::skill_enum[],
  skills_had skill_enum[] default array[]::skill_enum[],
  created_at timestamptz default now()
);

-- Recreate posts table
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  skill skill_enum,
  author_id uuid references user_profiles(id) on delete cascade not null,
  created_at timestamptz default now()
);

-- Recreate conversations table
create table conversations (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade not null,
  poster_id uuid references user_profiles(id) on delete cascade not null,
  responder_id uuid references user_profiles(id) on delete cascade not null,
  created_at timestamptz default now()
);

-- Recreate messages table
create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender_id uuid references user_profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

-- Recreate trigger function for new users
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, username, email)
  values (new.id, new.raw_user_meta_data->>'name', new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger for new users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Enable RLS on user_profiles
alter table user_profiles enable row level security;

-- RLS Policy: Users can read all profiles
drop policy if exists "Public profiles are viewable" on user_profiles;
create policy "Public profiles are viewable"
on user_profiles for select using (true);

-- RLS Policy: Users can update their own profile
drop policy if exists "Users can update own profile" on user_profiles;
create policy "Users can update own profile"
on user_profiles for update using (auth.uid() = id);

-- Enable RLS on posts
alter table posts enable row level security;

-- RLS Policy: Users can read all posts
drop policy if exists "Public posts are viewable" on posts;
create policy "Public posts are viewable"
on posts for select using (true);

-- RLS Policy: Users can create posts
drop policy if exists "Users can create posts" on posts;
create policy "Users can create posts"
on posts for insert with check (auth.uid() = author_id);

-- RLS Policy: Users can update their own posts
drop policy if exists "Users can update own posts" on posts;
create policy "Users can update own posts"
on posts for update using (auth.uid() = author_id);

-- Enable RLS on conversations
alter table conversations enable row level security;

-- RLS Policy: Users can read their own conversations
drop policy if exists "Users can read own conversations" on conversations;
create policy "Users can read own conversations"
on conversations for select using (
  auth.uid() = poster_id or auth.uid() = responder_id
);

-- Enable RLS on messages
alter table messages enable row level security;

-- RLS Policy: Users can read messages in their conversations
drop policy if exists "Users can read messages in their conversations" on messages;
create policy "Users can read messages in their conversations"
on messages for select using (
  exists (
    select 1 from conversations
    where conversations.id = messages.conversation_id
    and (conversations.poster_id = auth.uid() or conversations.responder_id = auth.uid())
  )
);

-- RLS Policy: Users can send messages in their conversations
drop policy if exists "Users can send messages in their conversations" on messages;
create policy "Users can send messages in their conversations"
on messages for insert with check (
  exists (
    select 1 from conversations
    where conversations.id = messages.conversation_id
    and (conversations.poster_id = auth.uid() or conversations.responder_id = auth.uid())
  )
);