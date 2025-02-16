"use client";

import React, { useEffect, useRef, useState } from "react";

import { Send } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
    created_at: string;
    user: {
      name: string;
      id: string;
      bio: string;
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
  const [readyToEnd, setReadyToEnd] = useState<string[]>([]);

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

  useEffect(() => {
    const fetchConversationStatus = async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("ready_to_end")
        .eq("id", conversationId)
        .single();

      if (!error && data) {
        setReadyToEnd(data.ready_to_end || []);
      }
    };

    fetchConversationStatus();

    const channel = supabase
      .channel("public:conversations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `id=eq.${conversationId}`,
        },
        (payload) => {
          if (payload.new) {
            setReadyToEnd((payload.new as { ready_to_end: string[] }).ready_to_end || []);
          }
        }
      )
      .subscribe();

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

  const handleEndChat = async () => {
    try {
      const newReadyToEnd = readyToEnd.includes(userId)
        ? readyToEnd.filter((id) => id !== userId)
        : [...readyToEnd, userId];

      console.log("Updating ready_to_end with:", newReadyToEnd);

      const { data, error } = await supabase
        .from("conversations")
        .update({ ready_to_end: newReadyToEnd })
        .eq("id", conversationId)
        .select()
        .single();

      if (error) {
        console.error("Supabase update error:", error);
        throw error;
      }

      console.log("Update response:", data);
      setReadyToEnd(newReadyToEnd);
    } catch (error) {
      console.error("Error updating chat status:", error);
    }
  };

  const isEveryoneReady = readyToEnd.length === 2;

  return (
    <div className="flex max-h-[calc(100vh-208px)] w-full flex-1">
      <div className="m-2 flex w-1/3 flex-col justify-between rounded-lg border border-muted-foreground/20 bg-muted/50 p-4 shadow-md">
        <div>
          <h5 className="mb-2 flex flex-row items-center font-brand text-xl font-bold">
            {post.title}{" "}
            <span className="ml-2 w-min rounded-full bg-primary px-2 py-1 font-sans text-xs font-semibold text-white">
              {post.skilltag}
            </span>
          </h5>
          <p className="mb-2 flex flex-col text-base">{post.body}</p>
          <p className="text-sm text-muted-foreground">
            Created on {new Date(post.created_at).toDateString()}
          </p>
        </div>
        <div className="mt-4 flex items-center p-4">
          <Avatar>
            <AvatarFallback>{post?.user?.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h6 className="text-sm font-semibold">{post?.user?.name}</h6>
            <p className="text-xs text-muted-foreground">{post?.user?.bio}</p>
          </div>
        </div>
      </div>
      <div className="m-2 flex flex-grow flex-col">
        {isEveryoneReady && (
          <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-700">
            Chat has ended. Both users have agreed to finish.
          </div>
        )}
        <div className="flex-grow overflow-y-auto rounded-lg border border-gray-300 p-4">
          {messages.map((message, index) => (
            <Message key={index} message={message} userId={userId} />
          ))}
          <div ref={scrollToBottomRef} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow rounded-lg border border-gray-300 p-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isEveryoneReady}
          />
          <button
            className="ml-2 flex aspect-square items-center justify-center rounded-full bg-blue-500 p-2 text-white disabled:opacity-50"
            onClick={handleSendMessage}
            disabled={isEveryoneReady}
          >
            <Send size="16" strokeWidth={2} />
          </button>
          <button
            onClick={handleEndChat}
            className={`rounded-lg px-4 py-2 ${
              readyToEnd.includes(userId)
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white`}
          >
            {readyToEnd.includes(userId) ? "Cancel End" : "End Chat"}
          </button>
        </div>
        {readyToEnd.length > 0 && !isEveryoneReady && (
          <div className="mt-2 text-sm text-gray-600">
            {readyToEnd.includes(userId)
              ? "Waiting for the other user to end the chat..."
              : "The other user wants to end the chat. Click 'End Chat' if you agree."}
          </div>
        )}
      </div>
    </div>
  );
}
