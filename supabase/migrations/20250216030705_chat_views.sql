set check_function_bodies = off;
create or replace view "public"."messages_with_users" as  SELECT m.id AS message_id,
    m.conversation_id,
    jsonb_build_object('user_id', u.id, 'username', u.username) AS "user",
    m.content,
    m.created_at
   FROM (messages m
     JOIN user_profiles u ON ((m.sender_id = u.id)));
create or replace view "public"."posts_with_users" as  SELECT p.id AS post_id,
    p.title,
    p.body,
    p.skill AS skilltag,
    jsonb_build_object('user_id', u.id, 'name', u.username) AS "user"
   FROM (posts p
     JOIN user_profiles u ON ((p.author_id = u.id)));
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.user_profiles (id, username, email)
  values (new.id, new.raw_user_meta_data->>'username', new.email);
  return new;
end;$function$;
