import { Suspense } from "react";

import Onboarding from "@/components/onboarding/onboarding";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
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
    <Suspense>
      <Onboarding enums={enums} user={user} />;
    </Suspense>
  );
}
