drop view posts_with_users;

create view
  public.posts_with_users as
select
  p.id as post_id,
  p.title,
  p.body,
  p.skill as skilltag,
  p.created_at,
  jsonb_build_object('user_id', u.id, 'name', u.username, 'bio', u.bio) as "user"
from
  posts p
  join user_profiles u on p.author_id = u.id;