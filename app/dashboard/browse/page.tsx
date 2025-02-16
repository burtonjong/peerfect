import { createClient } from "@/utils/supabase/server";

import BrowsePageClient from "./browse-page-client";

export default async function BrowsePage() {
  const supabase = await createClient();

  const userId = (await supabase.auth.getUser()).data.user?.id;

  const { data: posts, error } = await supabase.from("posts").select(`
      *,
      conversations ( id )
    `);

  if (error) {
    console.error(error);
    return <BrowsePageClient initialPosts={[]} userId="" />;
  }

  const postsWithoutConversations = posts.filter(
    (post) => post.conversations.length === 0
  );

  const postsThatAreNotUsers = postsWithoutConversations.filter(
    (post) => post.poster_id !== userId
  );

  return (
    <BrowsePageClient initialPosts={postsThatAreNotUsers} userId={userId!} />
  );
}
