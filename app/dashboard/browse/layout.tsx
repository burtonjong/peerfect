import Link from "next/link";
import type React from "react";

import { Bell, Search, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarLink } from "@/components/ui/sidebar-link";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks = [
    { name: "All Classes", href: "/browse" },
    { name: "Creative Career", href: "/browse/creative" },
    { name: "Creativity & Inspiration", href: "/browse/inspiration" },
    { name: "Design", href: "/browse/design" },
    { name: "Art & Illustration", href: "/browse/art" },
    { name: "Film & Video", href: "/browse/video" },
    { name: "Photography", href: "/browse/photography" },
    { name: "Photography Career & Industry", href: "/browse/photo-career" },
    {
      name: "Photography Techniques & Fundamentals",
      href: "/browse/photo-techniques",
    },
    { name: "Photo Post-Production", href: "/browse/photo-post" },
    { name: "Photographic Styles", href: "/browse/photo-styles" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "AI for Photography", href: "/browse/ai-photo" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed left-0 top-0 z-10 w-full border-b bg-[#0A1A2B] text-white">
        <div className="flex h-16 w-full items-center gap-4 px-4">
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

      <div className="flex flex-1 pt-16">
        {/* Left Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 space-y-4 border-r p-6">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <SidebarLink key={link.href} name={link.name} href={link.href} />
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8 pb-16">{children}</main>
      </div>
    </div>
  );
}
