"use client";

import { useEffect, useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import Post from "@/components/browse/post";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

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
  modal?: boolean;
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
        <div className="mb-4 mt-2 flex flex-col items-center justify-between">
          <div className="mb-3 flex w-full flex-row justify-between">
            <h1 className="font-brand text-4xl font-bold text-primary">
              Browse Skills
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Sort by Date
                  {sortOrder === "desc" ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSortChange("desc")}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("asc")}>
                  Oldest First
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator />
        </div>

        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                skill={post.skill}
                created_at={post.created_at}
                poster_id={post.author_id}
                user_id={userId as string}
              />
            ))}
          </div>
        ) : (
          <p className="pt-40 text-center text-muted-foreground">
            No posts available for this skill.
          </p>
        )}
      </div>
    </main>
  );
}
