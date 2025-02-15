// everytime you make a fetch request either make it
// const response = await fetch(`${API_URL}/data`);
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://peerfect.vercel.app"
    : "http://localhost:3000";
