"use client";

import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreateMeetButton = () => {
  const createMeet = async () => {
    try {
      const response = await fetch("/api/create-meet", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      console.log("Google Meet Space:", data);
    } catch (error) {
      console.error("Error creating Google Meet space:", error);
    }
  };

  return (
    <Button className="mt-4 w-full" onClick={createMeet}>
      <GraduationCap className="mr-2 h-4 w-4" /> Create Google Meet
    </Button>
  );
};

export default CreateMeetButton;
