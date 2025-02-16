"use server";

import { createClient } from "@/utils/supabase/server";

// messages need a conversation_id, a sender_id, and content.

export const sendMessage = async (formData: FormData) => {
  const message = formData.get("message") as string;
  const conversationId = formData.get("conversationId") as string;
  const userId = formData.get("userId") as string;
  const supabase = await createClient();

  console.log(message, conversationId, userId);

  const { error } = await supabase.from("messages").insert([
    {
      content: message,
      conversation_id: conversationId,
      sender_id: userId,
    },
  ]);

  if (error) {
    console.error(error);
  }
};
