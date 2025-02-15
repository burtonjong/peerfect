import { Button } from '@/components/ui/button';

export default function Body() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-teal-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect with Skilled Peers
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Peerfect matches people with skills to those who need help.
                  Learn, grow, and succeed together.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Find a Helper</Button>
                <Button variant="outline">Offer Your Skills</Button>
              </div>
            </div>
          </div>
        </section>
        
    );
}
