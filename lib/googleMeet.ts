import { SpacesServiceClient } from "@google-apps/meet";

const isServer = typeof window === "undefined"; // Ensures this code runs only on the server

let SpacesServiceClient: any;
if (isServer) {
  SpacesServiceClient = require("@google-apps/meet").SpacesServiceClient;
}

export const createGoogleMeetSpace = async () => {
  if (!isServer) {
    throw new Error("createGoogleMeetSpace can only be called on the server.");
  }

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
