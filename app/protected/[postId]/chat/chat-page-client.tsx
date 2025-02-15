"use client";

import React from "react";

export default function ChatPage({
  post,
  messages,
}: {
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
    message: string;
  }[];
}) {
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
            src={post.user.profilePicture}
            alt="JD"
            className="h-10 w-10 rounded-full border"
          />
          <div className="ml-3">
            <h6 className="text-sm font-semibold">{post.user.name}</h6>
            <p className="text-xs text-gray-600">{post.user.bio}</p>
          </div>
        </div>
      </div>
      <div className="m-2 flex flex-grow flex-col">
        <div className="flex-grow overflow-y-auto rounded-lg border border-gray-300 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="mb-4 flex gap-2 rounded-2xl rounded-bl-none bg-primary/10 p-2"
            >
              <img
                src={message.user.profilePicture}
                alt="JD"
                className="h-10 w-10 rounded-full border"
              />
              <div>
                <h6 className="text-sm font-semibold">{message.user.name}</h6>
                <p className="text-xs text-gray-600">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow rounded-lg border border-gray-300 p-2"
          />
          <button className="ml-2 rounded-lg bg-blue-500 p-2 text-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
