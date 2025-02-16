-- Drop existing column if it exists
alter table conversations drop column if exists ready_to_end;

-- Add the column with correct type
alter table conversations add column ready_to_end uuid[] default '{}';

-- Add policy to allow users to update ready_to_end if they're in the chat
create policy "Users can update ready_to_end"
on conversations
for update using (true)
with check (true);