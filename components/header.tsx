import Link from "next/link";

import HeaderAuth from "@/components/header-auth";

export default function Header() {
  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Link href={"/"}>Peerfect</Link>
        </div>
        <HeaderAuth />
      </div>
    </nav>
  );
}
