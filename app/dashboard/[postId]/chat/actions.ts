"use server";

import { createClient } from "@/utils/supabase/server";

export const sendMessage = async (formData: FormData) => {
  console.log("sending message");

  const message = formData.get("message") as string;
  const conversationId = formData.get("conversationId") as string;
  const user_id = formData.get("user_id") as string;
  const supabase = await createClient();

  console.log("sending message", message, conversationId, user_id);

  const { error } = await supabase.from("messages").insert([
    {
      content: message,
      conversation_id: conversationId,
      sender_id: user_id,
    },
  ]);

  if (error) {
    console.error(error);
  }
};
