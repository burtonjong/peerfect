"use client";
import { useEffect, useState } from "react";
import { Tables } from "@/database.types";
import Post from "@/components/browse/post"; // Import the Post component

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
        return sortOrder === "desc" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      });
      setSortedPosts(sorted);
    }
  }, [posts, sortOrder]);

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="container min-w-[750px] mx-auto px-4">
      <div className="flex justify-between items-center mb-8 mt-12">
        <h1 className="text-4xl font-bold">Browse Skills</h1>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="px-3 py-1.5 text-sm font-medium text-white border border-transparent rounded-md bg-[hsl(220,50%,20%)] hover:bg-[hsl(220,50%,25%)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sort by Date
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[hsl(220,50%,20%)] border border-transparent rounded-md shadow-lg">
              <div
                onClick={() => handleSortChange("desc")}
                className="px-4 py-2 text-sm text-white cursor-pointer hover:bg-[hsl(220,50%,25%)]"
              >
                Newest First
              </div>
              <div
                onClick={() => handleSortChange("asc")}
                className="px-4 py-2 text-sm text-white cursor-pointer hover:bg-[hsl(220,50%,25%)]"
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
  );
}
