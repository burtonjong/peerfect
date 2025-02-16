"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BrowsePageClient from "./browse-page-client";

type QueryHandlerProps = {
  posts: any[];
  postsNotUsers: any[]
  userId: string;
};

export default function QueryHandler({ posts, postsNotUsers, userId }: QueryHandlerProps) {
  const searchParams = useSearchParams();
  const modalParam = searchParams.get("modal") === "true"; 
  const [sortedPosts, setSortedPosts] = useState(posts);

  useEffect(() => {
    if (modalParam && posts.length > 0) {
      const sorted = [...posts].sort((a, b) => {
        const dateA = new Date(a.created_at || "").getTime();
        const dateB = new Date(b.created_at || "").getTime();
        return dateB - dateA;
      });

      setSortedPosts([sorted[0], ...(postsNotUsers || [])]);
    }
  }, [modalParam, posts]);

  return (<BrowsePageClient initialPosts={sortedPosts} userId={userId} modal={modalParam} />);
}
