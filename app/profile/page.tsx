import { ProfileContent } from "@/components/profile/profile-content";
import { ProfileHeader } from "@/components/profile/profile-header";
import { Card } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function ProfilePage() {
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
      <Card>
        <ProfileHeader user={user} />
        <ProfileContent user={user} enums={enums} />  
      </Card>
    </div>
  );
}
