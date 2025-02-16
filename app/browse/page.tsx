"use client";

// Import the Post component
import { useEffect, useState } from "react";

import Post from "@/components/browse/post";
import Sidebar from "@/components/browse/sidebar";

type Post = {
  id: string;
  title: string;
  body: string;
  skill: string;
  author_id: string;
  created_at: string | null;
};

export default function BrowsePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${window.location.origin}/api/posts`);
        const data = await res.json();
        if (data && !data.error) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const sorted = [...posts].sort((a, b) => {
        if (!a.created_at || !b.created_at) return 0; // Handle invalid or missing dates
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === "desc"
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      });
      setSortedPosts(sorted);
    }
  }, [posts, sortOrder]);

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <>
      <div className="container mx-auto min-w-[750px] px-4">
        <div className="mb-8 mt-12 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Browse Skills</h1>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="rounded-md border border-transparent bg-[hsl(220,50%,20%)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[hsl(220,50%,25%)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sort by Date
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md border border-transparent bg-[hsl(220,50%,20%)] shadow-lg">
                <div
                  onClick={() => handleSortChange("desc")}
                  className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-[hsl(220,50%,25%)]"
                >
                  Newest First
                </div>
                <div
                  onClick={() => handleSortChange("asc")}
                  className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-[hsl(220,50%,25%)]"
                >
                  Oldest First
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {loading ? (
            <p>Loading posts...</p>
          ) : sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                skill={post.skill}
                created_at={post.created_at}
              />
            ))
          ) : (
            <p>No posts available for this skill.</p>
          )}
        </div>
      </div>
    </>
  );
}
