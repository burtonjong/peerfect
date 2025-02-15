import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, UserPlus, Users } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <>
     <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">Peerfect</span>
          <UserPlus className="h-6 w-6 text-teal-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">Peerfect</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link> 
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Testimonials
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-teal-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect with Skilled Peers
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Peerfect matches people with skills to those who need help. Learn, grow, and succeed together.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Find a Helper</Button>
                <Button variant="outline">Offer Your Skills</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Why Choose Peerfect?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Users className="h-8 w-8 text-teal-600" />
                <h3 className="text-xl font-bold">Diverse Skill Pool</h3>
                <p className="text-gray-500 text-center">
                  Access a wide range of skills from our community of helpers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-teal-600" />
                <h3 className="text-xl font-bold">Verified Profiles</h3>
                <p className="text-gray-500 text-center">Trust our community with our thorough verification process.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <ArrowRight className="h-8 w-8 text-teal-600" />
                <h3 className="text-xl font-bold">Easy Matching</h3>
                <p className="text-gray-500 text-center">Our smart algorithm connects you with the perfect helper.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">For Those Seeking Help</h3>
                <ol className="space-y-4">
                  <li className="flex items-center space-x-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
                      1
                    </span>
                    <span>Create a profile and describe your needs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
                      2
                    </span>
                    <span>Browse through skilled helpers or get matched</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
                      3
                    </span>
                    <span>Connect and collaborate to achieve your goals</span>
                  </li>
                </ol>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">For Skilled Helpers</h3>
                <ol className="space-y-4">
                  <li className="flex items-center space-x-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
                      1
                    </span>
                    <span>Create a profile showcasing your skills</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
                      2
                    </span>
                    <span>Set your availability and preferences</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
                      3
                    </span>
                    <span>Get matched with those who need your expertise</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              What Our Users Say
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg">
                <p className="text-gray-500 italic">
                  "Peerfect helped me find a great mentor for my coding project. Highly recommended!"
                </p>
                <p className="font-bold">- Alex S.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg">
                <p className="text-gray-500 italic">
                  "As a helper, I love being able to share my skills and make a difference."
                </p>
                <p className="font-bold">- Maria L.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg">
                <p className="text-gray-500 italic">
                  "The platform is so easy to use. I found help for my business plan in no time!"
                </p>
                <p className="font-bold">- James R.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-teal-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-teal-50 md:text-xl">
                  Join Peerfect today and start connecting with skilled peers or offer your expertise to those in need.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white text-gray-900"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-white text-teal-600 hover:bg-teal-50" type="submit">
                    Sign Up
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2025 Peerfect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
    </>
   
  )
}

