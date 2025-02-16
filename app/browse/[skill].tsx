import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Tables } from '@/database.types'; 

export default function SkillPage() {
  const router = useRouter();
  const { skill } = router.query;  
  const [posts, setPosts] = useState<Tables<'posts'>[]>([]); 

  useEffect(() => {
    if (skill) {
      const fetchPosts = async () => {
        const res = await fetch(`/api/posts?skill=${skill}`);
        const data = await res.json();
        
        if (data && !data.error) {
          setPosts(data);
        }
      };

      fetchPosts();
    }
  }, [skill]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Posts for {skill}</h1>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="mb-4">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <p>No posts available for this skill.</p>
        )}
      </div>
    </div>
  );
}
