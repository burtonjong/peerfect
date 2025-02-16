"use client";

import { useEffect, useState } from "react";

import Post from "@/components/browse/post";
import { Button } from "@/components/ui/button";

type Post = {
  id: string;
  title: string;
  body: string;
  skill: string;
  author_id: string;
  created_at: string | null;
};

type BrowsePageClientProps = {
  initialPosts: Post[];
  userId: string;
  modal: boolean; 
};

export default function BrowsePageClient({
  initialPosts,
  userId,
  modal,
}: BrowsePageClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [sortedPosts, setSortedPosts] = useState<Post[]>(initialPosts);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (posts.length > 0) {
      const sorted = [...posts].sort((a, b) => {
        if (!a.created_at || !b.created_at) return 0; 
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
    setDropdownOpen(false);
  };

  return (
    <main className="ml-64 flex-1 p-4 pb-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto min-w-[1000px] px-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Browse Skills</h1>
          <div className="relative">
            <Button onClick={() => setDropdownOpen((prev) => !prev)}>
              Sort by Date
            </Button>
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post, index) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                skill={post.skill}
                created_at={post.created_at}
                poster_id={post.author_id}
                user_id={userId}
                modal={index === 0 ? modal : false}
              />
            ))
          ) : (
            <p className="dark:text-gray-40 pt-40 text-center text-gray-600">
              No posts available for this skill.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
