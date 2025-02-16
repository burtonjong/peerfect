import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  if (typeof window !== "undefined") {
    return res.status(400).json({ error: "API route cannot be accessed on the client" });
  }

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { SpacesServiceClient } = require("@google-apps/meet"); // Import only inside API route
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
    res.status(500).json({ error: error.message });
  }
}
