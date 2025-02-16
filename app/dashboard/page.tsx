import Link from "next/link";

import { Plus, SchoolIcon as Teach } from "lucide-react";

import Leaderboard from "@/components/dashboard/leaderboard";
import RecentChats from "@/components/dashboard/recentChats";
import YourPosts from "@/components/dashboard/yourPosts";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

const formatDateToLocaleString = (date: string) => {
  const postDate = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - postDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays > 7) {
    return postDate.toLocaleString();
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const userId = (await supabase.auth.getUser()).data.user?.id;

  const getUsersPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("author_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    }

    return data;
  };

  const getConversations = async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*, post_id(*), poster_id(*), responder_id(*)")
      .or(`poster_id.eq.${userId},responder_id.eq.${userId}`);

    if (error) {
      console.error(error);
    }

    return data;
  };

  const getLeaderboard = async () => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .order("points", { ascending: false });

    if (error) {
      console.error(error);
    }

    return data;
  };

  const usersPosts = await getUsersPosts();
  const conversations = await getConversations();
  const leaderboard = await getLeaderboard();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-brand text-6xl font-bold text-primary">
        Welcome to Peerfect
      </h1>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h3 className="font-brand text-xl font-semibold">
            Learn a New Skill
          </h3>
          <p className="text-gray-600">Discover new skills taught by peers</p>
          <Link href="/dashboard/createPost" passHref>
            <Button className="mt-4 w-full">
              <Plus className="mr-2 h-4 w-4" /> Create a Listing
            </Button>
          </Link>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-brand text-xl font-semibold">
            Offer Your Expertise
          </h3>
          <p className="text-gray-600">Share your skills with others</p>
          <Link href="/dashboard/browse" passHref>
            <Button className="mt-4 w-full">
              <Teach className="mr-2 h-4 w-4" /> Browse Listings
            </Button>
          </Link>
        </div>
      </div>

      <YourPosts
        conversations={conversations ?? []}
        usersPosts={usersPosts ?? []}
        formatDateToLocaleString={formatDateToLocaleString}
      />
      <RecentChats
        conversations={conversations ?? []}
        userId={userId ?? ""}
        formatDateToLocaleString={formatDateToLocaleString}
      />
      <Leaderboard leaderboard={leaderboard ?? []} />
    </div>
  );
}
