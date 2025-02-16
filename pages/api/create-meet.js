import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  try {
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
