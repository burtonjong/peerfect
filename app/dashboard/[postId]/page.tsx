import { createClient } from "@/utils/supabase/server";

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const getPost = async (postId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts_with_users")
      .select("*")
      .eq("post_id", postId);
    if (error) {
      throw error;
    }
    return data;
  };

  const postId = (await params).postId;

  const post = await getPost(postId);

  return (
    <div>
      <h2>Hey! This is oh-so-temporary</h2>
      <p>Post ID: {postId}</p>
      <p>Post title: {post[0].title}</p>
      <p>Post body: {post[0].body}</p>
      <p>Post skill tag: {post[0].skillTag}</p>
      <p>Post user: {post[0].user.username}</p>
    </div>
  );
}
