"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import Post from "@/components/browse/post";
import Sidebar from "@/components/browse/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";

type Post = {
  id: string;
  title: string;
  body: string;
  skill: string;
  author_id: string;
  created_at: string | null;
};

export default function SkillPage() {
  const params = useParams();
  const skill = params.skill as string;

  const capitalizedSkill = skill.charAt(0).toUpperCase() + skill.slice(1);

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserId = async () => {
    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();
    return data?.user?.id;
  };

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserId().then((id) => setUserId(id as string));
  }, []);

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

    const fetchSkills = async () => {
      try {
        const res = await fetch(`${window.location.origin}/api/skills`);
        const data = await res.json();
        if (data && !data.error) {
          setSkills(data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchPosts();
    fetchSkills();
  }, []);

  useEffect(() => {
    if (capitalizedSkill && posts.length > 0) {
      setFilteredPosts(posts.filter((post) => post.skill === capitalizedSkill));
    }
  }, [capitalizedSkill, posts]);

  useEffect(() => {
    if (filteredPosts.length > 0) {
      const sorted = [...filteredPosts].sort((a, b) => {
        if (!a.created_at || !b.created_at) return 0;
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === "desc"
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      });
      setSortedPosts(sorted);
    } else {
      setSortedPosts([]);
    }
  }, [sortOrder, filteredPosts]);

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar skills={skills} />
        <main className="ml-64 flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-8 pb-16 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="mb-4 mt-4 flex items-center justify-between">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                Posts for {capitalizedSkill}
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

            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-gray-100"></div>
              </div>
            ) : sortedPosts.length > 0 ? (
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
              <p className="text-center text-gray-600 dark:text-gray-400">
                No posts available for this skill.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
