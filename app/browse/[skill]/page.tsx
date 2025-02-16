'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Post from '@/components/browse/post';

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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${window.location.origin}/api/posts`);
      const data = await res.json();
      if (data && !data.error) {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (capitalizedSkill && posts.length > 0) {
      setFilteredPosts(posts.filter(post => post.skill === capitalizedSkill));
    }
  }, [capitalizedSkill, posts]);

  useEffect(() => {
    if (filteredPosts.length > 0) {
      const sorted = [...filteredPosts].sort((a, b) => {
        if (!a.created_at || !b.created_at) return 0; 
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === "desc" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      });
      setFilteredPosts(sorted);
    }
  }, [sortOrder, filteredPosts]);

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    setDropdownOpen(false); 
  };

  return (
    <div className="container min-w-[750px] mx-auto px-4">
      <div className="flex justify-between items-center mb-8 mt-12">
        <h1 className="text-4xl font-bold">Posts for {capitalizedSkill}</h1>

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
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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
