'use client'

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import { SidebarLink } from "@/components/ui/sidebar-link";
import Link from "next/link";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [skills, setSkills] = useState<string[]>([]);

  // Fetch skills from the API
  useEffect(() => {
    const fetchSkills = async () => {
      const res = await fetch('/api/skills');  // Assuming you have an API route to fetch skills
      const data = await res.json();
      if (data && !data.error) {
        setSkills(data);
      }
    };

    fetchSkills();
  }, []);

  const sidebarLinks = [
    { name: "All Classes", href: "/browse" },
    ...skills.map(skill => ({
      name: skill,
      href: `/browse/${skill.toLowerCase()}`,  // Create dynamic links for each skill
    })),
    { name: "Dashboard", href: "/dashboard" },
    { name: "AI for Photography", href: "/browse/ai-photo" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b bg-[#0A1A2B] text-white w-full fixed top-0 left-0 z-10">
        <div className="w-full px-4 h-16 flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold">
            Peerfect
          </Link>

          <div className="relative flex-1 max-w-2xl mx-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search classes, digital products, teachers, and more"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
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
            <Button className="bg-[#4ADE80] text-[#0A1A2B] hover:bg-[#4ADE80]/90">Start Now</Button>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex pt-16">
        {/* Left Sidebar */}
        <aside className="w-64 border-r p-6 space-y-4 fixed top-16 left-0 h-[calc(100vh-4rem)]">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <SidebarLink key={link.href} name={link.name} href={link.href} />
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 ml-64 pb-16">{children}</main>
      </div>
    </div>
  );
}
