import { createClient } from "@/utils/supabase/server";
import { CreatePostForm } from "@/components/postForm/createPostForm";

export default async function CreatePostPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: enums } = await supabase.rpc("get_types", {
    enum_type: "skill_enum",
  });

  if (!user) {
    return <div>Failed to load user data</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <CreatePostForm user={user} enums={enums} />
    </div>
  );
}
