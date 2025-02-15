"use client";

import { usePathname } from "next/navigation";

export default function ClientSideComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBrowsePage = pathname.startsWith("/browse");

  return !isBrowsePage ? <>{children}</> : null;
}
