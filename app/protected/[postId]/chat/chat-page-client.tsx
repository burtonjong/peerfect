"use client";

import React, { useState } from "react";

import { Send } from "lucide-react";

import * as schema from "@/database.types";

import { sendMessage } from "./actions";

export default function ChatPage({
  userId,
  post,
  messages: initialMessages,
  conversationId,
}: {
  userId: string;
  post: {
    title: string;
    body: string;
    skillTag: string;
    user: {
      name: string;
      bio: string;
      profilePicture: string;
    };
  };
  messages: {
    user: {
      name: string;
      userId: string;
      profilePicture: string;
    };
    content: string;
  }[];
  conversationId: string;
}) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const currentUserId = userId;

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const newMessageObject = {
        user: {
          name: "Current User",
          userId: currentUserId,
          profilePicture: "path/to/currentUserProfilePicture",
        },
        message: newMessage,
      };
      setMessages([...messages, newMessageObject]);
      setNewMessage("");

      const formData = new FormData();
      formData.append("message", newMessage);
      formData.append("conversationId", conversationId);
      formData.append("userId", currentUserId);

      await sendMessage(formData);
    }
  };

  return (
    <div className="flex h-full w-full flex-1">
      <div className="m-2 flex w-1/3 flex-col justify-between rounded-lg bg-white p-4 shadow-md">
        <div>
          <h5 className="mb-2 text-xl font-bold">{post.title}</h5>
          <p className="text-base">
            {post.body}
            <br />
            <span className="text-sm font-semibold text-gray-600">
              Skill: {post.skillTag}
            </span>
          </p>
        </div>
        <div className="mt-4 flex items-center p-4">
          <img
            src={post?.user?.profilePicture}
            alt="JD"
            className="h-10 w-10 rounded-full border"
          />
          <div className="ml-3">
            <h6 className="text-sm font-semibold">{post?.user?.name}</h6>
            <p className="text-xs text-gray-600">{post?.user?.bio}</p>
          </div>
        </div>
      </div>
      <div className="m-2 flex flex-grow flex-col">
        <div className="flex-grow overflow-y-auto rounded-lg border border-gray-300 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex gap-2 p-2 ${
                message?.user?.user_id === currentUserId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message?.user?.user_id !== currentUserId && (
                <img
                  src={message?.user?.profilePicture}
                  alt="JD"
                  className="h-10 w-10 rounded-full border"
                />
              )}
              <div
                className={`max-w-xs rounded-2xl p-2 ${
                  message?.user?.user_id === currentUserId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <h6 className="text-sm font-semibold">
                  {message?.user?.username}
                </h6>
                <p className="text-xs">{message.content}</p>
              </div>
              {message?.user?.user_id === currentUserId && (
                <img
                  src={message?.user?.profilePicture}
                  alt="JD"
                  className="h-10 w-10 rounded-full border"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow rounded-lg border border-gray-300 p-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="ml-2 flex aspect-square items-center justify-center rounded-full bg-blue-500 p-2 text-white"
            onClick={handleSendMessage}
          >
            <Send size="16" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
