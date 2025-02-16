import { SpacesServiceClient } from "@google-apps/meet";

const meetClient = new SpacesServiceClient();

export const createGoogleMeetSpace = async () => {
  try {
    const response = await fetch("/api/create-meet", { method: "POST" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    console.log("Google Meet Space:", data);
    return data;
  } catch (error) {
    console.error("Error creating Google Meet space:", error);
    throw error;
  }
};
