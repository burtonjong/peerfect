import { Suspense } from "react";

import Onboarding from "@/components/onboarding/onboarding";

export default async function Page() {
  return (
    <Suspense>
      <Onboarding />;
    </Suspense>
  );
}
