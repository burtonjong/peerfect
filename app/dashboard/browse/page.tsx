import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import BrowsePageClient from "./browse-page-client";
import QueryHandler from "./query-handler"; // Import the new client component

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function BrowsePage({ searchParams }: Props) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id || "";

  const { data: posts, error } = await supabase
    .from("posts")
    .select(`*, conversations ( id )`);

  if (error) {
    console.error(error);
    return <BrowsePageClient initialPosts={[]} userId={userId} modal={false} />;
  }

  const postsWithoutConversations = (posts || []).filter(
    (post: any) => post.conversations?.length === 0
  );

  const postsThatAreNotUsers = postsWithoutConversations.filter(
    (post: any) => post.author_id !== userId
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryHandler posts={posts} postsNotUsers={postsThatAreNotUsers} userId={userId} />
    </Suspense>
  );
}
