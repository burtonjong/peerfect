// components/BrowseLayout.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import Sidebar from "@/components/browse/sidebar"; 
import Link from "next/link";

type BrowseLayoutProps = {
  children: React.ReactNode;
  skills: string[];  
};

export default function BrowseLayout({ children, skills }: BrowseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
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
        <Sidebar skills={skills} />

        <main className="flex-1 p-8 ml-64 pb-16">{children}</main>
      </div>
    </div>
  );
}
