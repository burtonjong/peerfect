import { createClient } from "@/utils/supabase/server";

import ChatPage from "./chat-page-client";

const conversationId = "2601e204-325f-45a1-bad0-e0459ce9174f"; // change this later

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

  const userId = (await getUser()).user.id;

  const getMessages = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("messages_with_users")
      .select("*")
      .eq("conversation_id", conversationId);
    if (error) {
      throw error;
    }
    console.log(data);
    return data;
  };

  const messages = await getMessages();

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

  const postId = (await params).postId;

  const post = await getPost(postId);

  return (
    <ChatPage
      userId={userId}
      post={post[0]}
      messages={messages}
      conversationId={conversationId}
    />
  );
}
