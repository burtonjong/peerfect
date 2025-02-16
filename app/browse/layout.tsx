'use client';

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import Sidebar from "@/components/browse/sidebar";  // Import the Sidebar component
import Link from "next/link";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
        const res = await fetch(`${window.location.origin}/api/skills`);
        const data = await res.json();
      if (data && !data.error) {
        setSkills(data);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-[#0A1A2B] text-white w-full fixed top-0 left-0 z-10">
        <div className="w-full px-4 h-16 flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold">
            Peerfect
          </Link>

          <div className="relative mx-4 max-w-2xl flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Search classes, digital products, teachers, and more"
              className="border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/60"
            />
          </div>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" className="text-white">
              Browse
            </Button>
            <Button variant="ghost" className="text-white">
              My Classes
            </Button>
            <Bell className="h-5 w-5" />
            <Button variant="ghost" className="text-white">
              <User className="h-5 w-5" />
            </Button>
            <Button className="bg-[#4ADE80] text-[#0A1A2B] hover:bg-[#4ADE80]/90">
              Start Now
            </Button>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex pt-16">
        <Sidebar skills={skills} /> {/* Use Sidebar component */}

        <main className="flex-1 p-8 ml-64 pb-16">{children}</main>
      </div>
    </div>
  );
}
