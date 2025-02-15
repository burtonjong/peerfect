import Link from "next/link";

import { Handshake } from "lucide-react";

import HeaderAuth from "@/components/header-auth";

export default function Header() {
  return (
    <nav className="sticky top-0 flex h-16 w-full justify-center bg-background/50 backdrop-blur-md">
      <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Link
            href={"/"}
            className="font-brand flex flex-row items-center text-xl text-primary"
          >
            <Handshake size="24" strokeWidth={2} className="mr-1" />
            Peerfect
          </Link>
        </div>
        <HeaderAuth />
      </div>
    </nav>
  );
}
