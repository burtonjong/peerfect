import { createClient } from "@/utils/supabase/server";
import BrowsePageClient from "./browse-page-client";

export default async function BrowsePage({ searchParams }: { searchParams: { modal?: string } }) {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const resp = await searchParams;
  const modal = resp.modal == "true";

  const { data: posts, error } = await supabase.from("posts").select(`
    *,
    conversations ( id )
  `);

  if (error) {
    console.error(error);
    return <BrowsePageClient initialPosts={[]} userId="" modal={modal} />;
  }

  const postsWithoutConversations = posts.filter(
    (post) => post.conversations.length === 0
  );

  const postsThatAreNotUsers = postsWithoutConversations.filter(
    (post) => post.author_id !== userId
  );

  if (modal && postsThatAreNotUsers.length > 0) {
    const sortedPosts = posts.sort((a, b) => {
      const dateA = new Date(a.created_at || "").getTime();
      const dateB = new Date(b.created_at || "").getTime();
      return dateB - dateA; 
    });


    postsThatAreNotUsers.unshift(sortedPosts[0]);
  }

  return (
    <BrowsePageClient initialPosts={postsThatAreNotUsers} userId={userId!} modal={modal} />
  );
}
