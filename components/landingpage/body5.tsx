import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Body5() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-teal-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[600px] text-teal-50 md:text-xl">
                  Join Peerfect today and start connecting with skilled peers or
                  offer your expertise to those in need.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white text-gray-900"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    className="bg-white text-teal-600 hover:bg-teal-50"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
    );
}
