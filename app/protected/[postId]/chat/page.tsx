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

export default function ChatPageServer() {
  return <ChatPage post={mockData.post} messages={mockData.messages} />;
}
