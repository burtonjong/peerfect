import Link from "next/link";

import { Button } from "../ui/button";

export default function Body5() {
  return (
    <section className="w-full bg-primary py-12 text-white md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
              Join Peerfect today and start connecting with skilled peers or
              offer your expertise to those in need.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Link href="/sign-in" passHref>
              <Button variant="secondary" type="submit">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
