"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export const createChat = async (formData: FormData) => {
  const supabase = await createClient();
  const { error } = await supabase.from("conversations").insert([
    {
      post_id: formData.get("post_id") as string,
      poster_id: formData.get("poster_id") as string,
      responder_id: formData.get("responder_id") as string,
    },
  ]);

  if (error) {
    console.error(error);
  }

  return redirect(`/dashboard/${formData.get("post_id")}/chat`);
};
