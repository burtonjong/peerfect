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

  const userId = (await getUser()).user.id;
  const username = (await getUser()).user.user_metadata.username;

  console.log(userId, username);

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

  const getConversationUsers = async (conversationId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("conversations")
      .select(
        "poster: poster_id (username), responder: responder_id (username)"
      )
      .eq("id", conversationId)
      .single();
    if (error) {
      throw error;
    }

    return data;
  };

  const postId = (await params).postId;

  const post = await getPost(postId);
  const conversationUsers = await getConversationUsers(conversationId);

  return (
    <ChatPage
      userId={userId}
      username={username}
      post={post[0]}
      conversationId={conversationId}
      conversationUsers={conversationUsers}
    />
  );
}
