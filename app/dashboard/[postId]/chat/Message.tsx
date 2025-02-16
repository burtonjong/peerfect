import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Message({
  message,
  userId,
}: {
  message: {
    user: {
      username: string;
      user_id: string;
      profilePicture: string;
    };
    content: string;
  };
  userId: string;
}) {
  return (
    <div
      className={`mb-4 flex gap-2 p-2 ${
        message?.user?.user_id === userId ? "justify-end" : "justify-start"
      }`}
    >
      {message?.user?.user_id !== userId && (
        <Avatar>
          <AvatarImage src={message?.user?.profilePicture} />
          <AvatarFallback>{message?.user?.username[0]}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`min-w-32 max-w-96 rounded-2xl p-2 ${
          message?.user?.user_id === userId
            ? "rounded-br-none bg-blue-500 text-right text-white"
            : "rounded-bl-none bg-gray-300 text-left text-black"
        }`}
      >
        <h6 className="text-sm font-semibold">{message?.user?.username}</h6>
        <p className="text-xs">{message.content}</p>
      </div>
      {message?.user?.user_id === userId && (
        <Avatar>
          <AvatarImage src={message?.user?.profilePicture} />
          <AvatarFallback>{message?.user?.username[0]}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
