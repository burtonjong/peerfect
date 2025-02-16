import { createClient } from "@/utils/supabase/server";

import ChatPage from "./chat-page-client";

const mockData = {
  post: {
    title: "How To Tie Shoelaces",
    body: "Hi there! I don't know how to tie my shoelaces. Can someone help me?",
    skillTag: "Laundry",
    user: {
      name: "John Doe",
      bio: "Just a guy who can't tie his shoes",
      profilePicture: "/path/to/profile-picture.jpg",
    },
  },
  messages: [
    {
      user: {
        name: "John Doe",
        userId: "123",
        profilePicture: "/path/to/profile-picture.jpg",
      },
      message: "I can help! Here's a video tutorial: [link]",
    },
  ],
};

export default async function ChatPageServer() {
  const getUser = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }
    return data;
  };

  const userId = (await getUser()).user.id;

  return (
    <ChatPage
      userId={userId}
      post={mockData.post}
      messages={mockData.messages}
    />
  );
}
