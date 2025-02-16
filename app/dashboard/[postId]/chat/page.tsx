import { createClient } from "@/utils/supabase/server";

import ChatPage from "./chat-page-client";

const conversationId = "b09c01a4-07fa-440d-87b8-e35c051f2621"; // change this later

export default async function ChatPageServer({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const getUser = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }
    return data;
  };

  const getPost = async (postId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts_with_users")
      .select("*")
      .eq("post_id", postId);
    if (error) {
      throw error;
    }
    return data;
  };

  const userId = (await getUser()).user.id;

  const postId = (await params).postId;

  const post = await getPost(postId);

  return (
    <ChatPage userId={userId} post={post[0]} conversationId={conversationId} />
  );
}
