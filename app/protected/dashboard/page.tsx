import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, SchoolIcon as Teach, Calendar } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Peerfect</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Find Skills to Learn</h3>
          <p className="text-gray-600">Discover new skills taught by peers</p>
          <Link href="/browse">
            <Button className="w-full mt-4">
              <Search className="mr-2 h-4 w-4" /> Browse Skills
            </Button>
          </Link>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Offer Your Expertise</h3>
          <p className="text-gray-600">Share your skills with others</p>
          <Button className="w-full mt-4">
            <Teach className="mr-2 h-4 w-4" /> Create a Listing
          </Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Upcoming Sessions</h2>
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Introduction to Python</h3>
          <p className="text-gray-600">With John Doe • Tomorrow at 2:00 PM</p>
          <Button variant="outline" className="mt-4">
            <Calendar className="mr-2 h-4 w-4" /> Join Meeting
          </Button>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Digital Marketing Basics</h3>
          <p className="text-gray-600">With Jane Smith • Friday at 10:00 AM</p>
          <Button variant="outline" className="mt-4">
            <Calendar className="mr-2 h-4 w-4" /> Join Meeting
          </Button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/profile" className="text-primary hover:underline">
            My Profile
          </Link>
          <Link href="/messages" className="text-primary hover:underline">
            Messages
          </Link>
          <Link href="/settings" className="text-primary hover:underline">
            Account Settings
          </Link>
          <Link href="/help" className="text-primary hover:underline">
            Help & Support
          </Link>
        </div>
      </div>
    </div>
  )
}