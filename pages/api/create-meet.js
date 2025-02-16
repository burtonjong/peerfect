import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth-options"; // Ensure this exists and is correctly configured

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { SpacesServiceClient } = require("@google-apps/meet");
    const meetClient = new SpacesServiceClient();

    const response = await fetch("https://meetings.googleapis.com/v1/spaces", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: "SkillSwap Session",
        type: "ONE_TIME",
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    res.status(200).json({ meetLink: data.uri });
  } catch (error) {
    console.error("Error in create-meet API:", error);
    res.status(500).json({ error: error.message });
  }
}
