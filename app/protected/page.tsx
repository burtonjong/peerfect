import { redirect } from "next/navigation";

import { InfoIcon } from "lucide-react";

import { createClient } from "@/utils/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const getUserData = async () => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const getAllPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const getAllConversations = async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*, post_id:posts(id,title)")
      .or(`poster_id.eq.${user.id},responder_id.eq.${user.id}`);

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);

    return data;
  };

  const userData = await getUserData();
  const posts = await getAllPosts();
  const conversations = await getAllConversations();

  return (
    <div className="flex w-full flex-1 flex-col gap-12">
      <div className="flex items-center gap-4">
        <InfoIcon size={24} />
        <h1 className="text-2xl">Protected Page</h1>
      </div>
      <div>
        <h2 className="text-xl">User Data</h2>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>
      <div>
        <h2 className="text-xl">Posts</h2>
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <a href={`/protected/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl">Conversations</h2>
        <ul>
          {conversations?.map((conversation) => (
            <li key={conversation.id}>
              <a href={`/protected/${conversation.post_id.id}/chat`}>
                {conversation.post_id.title} chat
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
