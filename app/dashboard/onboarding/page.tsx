import Onboarding from "@/components/onboarding/onboarding";

export default function Page({
  searchParams,
}: {
  searchParams: { enums: string[]; userId: string };
}) {
  const enums = searchParams.enums;
  const userId = searchParams.userId;

  return <Onboarding enums={enums} userId={userId} />;
}
