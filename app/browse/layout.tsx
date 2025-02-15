import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"
import Link from "next/link"

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b bg-[#0A1A2B] text-white">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
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

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <aside className="w-64 border-r p-6 space-y-4">
          <nav className="space-y-1">
            <Link href="/browse" className="block py-2 text-sm hover:text-primary">
              All Classes
            </Link>
            <Link href="/browse/creative" className="block py-2 text-sm hover:text-primary">
              Creative Career
            </Link>
            <Link href="/browse/inspiration" className="block py-2 text-sm hover:text-primary">
              Creativity & Inspiration
            </Link>
            <Link href="/browse/design" className="block py-2 text-sm hover:text-primary">
              Design
            </Link>
            <Link href="/browse/art" className="block py-2 text-sm hover:text-primary">
              Art & Illustration
            </Link>
            <Link href="/browse/video" className="block py-2 text-sm hover:text-primary">
              Film & Video
            </Link>
            <Link href="/browse/photography" className="block py-2 text-sm font-medium bg-slate-100 rounded-md px-3">
              Photography
            </Link>
          </nav>

          <div className="pt-4 space-y-1">
            <Link href="/browse/photo-career" className="block py-2 text-sm hover:text-primary">
              Photography Career & Industry
            </Link>
            <Link href="/browse/photo-techniques" className="block py-2 text-sm hover:text-primary">
              Photography Techniques & Fundamentals
            </Link>
            <Link href="/browse/photo-post" className="block py-2 text-sm hover:text-primary">
              Photo Post-Production
            </Link>
            <Link href="/browse/photo-styles" className="block py-2 text-sm hover:text-primary">
              Photographic Styles
            </Link>
            <Link href="/dashboard" className="block py-2 text-sm hover:text-primary">
              Dashboard
            </Link>
            <Link href="/browse/ai-photo" className="block py-2 text-sm hover:text-primary">
              AI for Photography
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}

