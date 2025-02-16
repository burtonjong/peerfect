import Link from "next/link";

import { Plus, Search, Send, SchoolIcon as Teach } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

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

  const usersPosts = await getUsersPosts();
  const conversations = await getConversations();

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
          <Link href="/dashboard/browse">
            <Button className="mt-4 w-full">
              <Plus className="mr-2 h-4 w-4" /> Create Listing
            </Button>
          </Link>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-brand text-xl font-semibold">
            Offer Your Expertise
          </h3>
          <p className="text-gray-600">Share your skills with others</p>
          <Button className="mt-4 w-full">
            <Teach className="mr-2 h-4 w-4" /> Browse Listings
          </Button>
        </div>
      </div>

      <h2 className="mb-4 pb-2 font-brand text-2xl font-semibold">
        Your Posts
      </h2>
      <div className="mb-12 space-y-4">
        {usersPosts && usersPosts.length > 0 ? (
          usersPosts.map((post) => (
            <div key={post.id} className="rounded-lg border p-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">
                Posted {formatDateToLocaleString(post.created_at)}
              </p>
              <div className="space-x-2">
                {conversations?.some(
                  (conversation) => conversation.post_id.id === post.id
                ) ? (
                  <>
                    <Link href={`/dashboard/${post.id}/chat`} passHref>
                      <Button className="mt-4">
                        <Send className="mr-2 h-4 w-4" /> Chat
                      </Button>
                    </Link>
                    <Button variant="outline" className="mt-4">
                      <Search className="mr-2 h-4 w-4" /> View Listing
                    </Button>
                  </>
                ) : (
                  <Button className="mt-4">
                    <Search className="mr-2 h-4 w-4" /> View Listing
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">You have not created any posts yet.</p>
        )}
      </div>

      <h2 className="mb-4 font-brand text-2xl font-semibold">
        Your Recent Chats
      </h2>
      <div className="space-y-4">
        {conversations?.map((conversation) => {
          const otherUser =
            conversation.poster_id.id === userId
              ? conversation.responder_id
              : conversation.poster_id;
          return (
            <div key={conversation.id} className="rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">
                {formatDateToLocaleString(conversation.created_at)}
              </span>
              <h3 className="text-xl font-semibold">
                {conversation.post_id.title}
              </h3>
              <p className="text-gray-600">With {otherUser.username}</p>
              <div className="space-x-2">
                <Link
                  href={`/dashboard/${conversation.post_id.id}/chat`}
                  passHref
                >
                  <Button className="mt-4">
                    <Send className="mr-2 h-4 w-4" /> Chat
                  </Button>
                </Link>
                <Button variant="outline" className="mt-4">
                  <Search className="mr-2 h-4 w-4" /> View Listing
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <h2 className="mb-4 font-brand text-2xl font-semibold">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/profile"
            className="text-primary hover:underline"
          >
            My Profile
          </Link>
          <Link
            href="/dashboard/messages"
            className="text-primary hover:underline"
          >
            Messages
          </Link>
          <Link
            href="/dashboard/settings"
            className="text-primary hover:underline"
          >
            Account Settings
          </Link>
          <Link href="/dashboard/help" className="text-primary hover:underline">
            Help & Support
          </Link>
        </div>
      </div>
    </div>
  );
}

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
