"use client";

import { Teach } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createGoogleMeetSpace } from "@/lib/googleMeet";

const CreateMeetButton = () => {
  const createMeet = async () => {
    try {
      const space = await createGoogleMeetSpace();
      console.log("Google Meet Space:", space);
    } catch (error) {
      console.error("Error creating Google Meet space:", error);
    }
  };

  return (
    <Button className="mt-4 w-full" onClick={createMeet}>
      <Teach className="mr-2 h-4 w-4" /> Create Google Meet
    </Button>
  );
};

export default CreateMeetButton;
