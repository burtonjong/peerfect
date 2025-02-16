import { Suspense } from "react";

import { createClient } from "@/utils/supabase/server";

import ChatPage from "./chat-page-client";

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

  const getConversationId = async (postId: string, userId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("conversations")
      .select("id")
      .eq("post_id", postId)
      .single();

    if (error) throw error;
    return data.id;
  };

  const userId = (await getUser()).user.id;

  const postId = (await params).postId;

  const post = await getPost(postId);

  const conversationId = await getConversationId(postId, userId);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPage
        userId={userId}
        post={post[0]}
        conversationId={conversationId}
      />
    </Suspense>
  );
}
