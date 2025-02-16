"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="flex w-full flex-1 flex-col items-start">
      <h1 className="text-2xl font-semibold">404: Not found</h1>
      <Link href="/dashboard" className="text-primary hover:underline">
        Go home
      </Link>
    </div>
  );
}
