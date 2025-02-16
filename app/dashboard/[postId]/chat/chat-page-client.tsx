"use client";

import React, { useEffect, useRef, useState } from "react";

import { Send } from "lucide-react";

import { createClient } from "@/utils/supabase/client";

import Message from "./Message";
import { sendMessage } from "./actions";

export default function ChatPage({
  userId,
  post,
  conversationId,
}: {
  userId: string;
  post: {
    title: string;
    body: string;
    skilltag: string;
    user: {
      name: string;
      id: string;
    };
  };
  conversationId: string;
}) {
  const [newMessage, setNewMessage] = useState("");
  type MessageType = {
    content: string;
    sender_id: string;
    created_at: string;
    user: {
      username: string;
      user_id: string;
    };
  };

  const [messages, setMessages] = useState<MessageType[]>([]);

  const supabase = createClient();

  const scrollToBottomRef = useRef<HTMLDivElement>(null);

  console.log(post);

  useEffect(() => {
    // Fetch existing messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select(
          `
          content,
          sender_id,
          created_at
        `
        )
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        // Fetch user details for each message
        const messagesWithUsers = await Promise.all(
          data.map(async (message) => {
            const { data: user, error: userError } = await supabase
              .from("user_profiles")
              .select("username, id")
              .eq("id", message.sender_id)
              .single();

            if (userError) {
              console.error("Error fetching user data:", userError);
              return {
                ...message,
                user: { username: "Unknown", user_id: null },
              };
            }

            return {
              ...message,
              user: {
                username: user.username,
                user_id: user.id,
              },
            };
          })
        );

        setMessages(messagesWithUsers);

        scrollToBottom();
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          const newMessage = payload.new;

          // Fetch the associated user information
          const { data: user, error: userError } = await supabase
            .from("user_profiles")
            .select("username, id")
            .eq("id", newMessage.sender_id)
            .single();

          if (userError) {
            console.error("Error fetching user data:", userError);
            return;
          }

          const messageWithUser = {
            ...newMessage,
            user: {
              username: user.username,
              user_id: user.id,
            },
          };

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              ...messageWithUser,
              content: newMessage.content,
              sender_id: newMessage.sender_id,
              created_at: newMessage.created_at,
            },
          ]);

          scrollToBottom();
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollToBottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100); // Adjust the delay as needed
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const messageContent = newMessage;
      setNewMessage("");

      const formData = new FormData();
      formData.append("message", messageContent);
      formData.append("conversationId", conversationId);
      formData.append("user_id", userId);

      await sendMessage(formData);

      scrollToBottom();
    }
  };

  return (
    <div className="flex max-h-[calc(100vh-208px)] w-full flex-1">
      <div className="m-2 flex w-1/3 flex-col justify-between rounded-lg border border-muted-foreground/20 bg-muted/50 p-4 shadow-md">
        <div>
          <h5 className="mb-2 text-xl font-bold">{post.title}</h5>
          <p className="text-base">
            {post.body}
            <br />
            <span className="text-sm font-semibold text-gray-600">
              Skill: {post.skilltag}
            </span>
          </p>
        </div>
        <div className="mt-4 flex items-center p-4">
          <div className="ml-3">
            <h6 className="text-sm font-semibold">{post?.user?.name}</h6>
          </div>
        </div>
      </div>
      <div className="m-2 flex flex-grow flex-col">
        <div className="flex-grow overflow-y-auto rounded-lg border border-gray-300 p-4">
          {messages.map((message, index) => (
            <Message key={index} message={message} userId={userId} />
          ))}
          <div ref={scrollToBottomRef} />
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
