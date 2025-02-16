import { ReactNode, Suspense, use } from "react";

import { createClient } from "@/utils/supabase/server";
import BrowsePageClient from "./browse-page-client";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BrowsePage({ searchParams }: Props) {
  const { modal } = use(searchParams);
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const userId = user.data.user?.id || "";

  let freakyBoolean = false;

  modal === "true" ? (freakyBoolean = true) : (freakyBoolean = false);

  const { data: posts, error } = await supabase
    .from("posts")
    .select(`*, conversations ( id )`);

  if (error) {
    console.error(error);
    return (
      <BrowsePageClient
        initialPosts={[]}
        userId={userId}
        modal={freakyBoolean}
      />
    );
  }

  // Add proper type annotations for posts
  const postsWithoutConversations = (posts || []).filter(
    (post: any) => post.conversations?.length === 0
  );

  const postsThatAreNotUsers = postsWithoutConversations.filter(
    (post: any) => post.author_id !== userId
  );

  if (freakyBoolean && postsThatAreNotUsers.length > 0) {
    const sortedPosts = [...postsThatAreNotUsers].sort((a, b) => {
      const dateA = new Date(a.created_at || "").getTime();
      const dateB = new Date(b.created_at || "").getTime();
      return dateB - dateA;
    });

    postsThatAreNotUsers.unshift(sortedPosts[0]);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowsePageClient
        initialPosts={postsThatAreNotUsers}
        userId={userId}
        modal={freakyBoolean}
      />
    </Suspense>
  );
}
