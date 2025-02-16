
export default function Body4() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            What Our Users Say
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg">
              <p className="text-gray-500 italic">
                "Peerfect helped me find a great mentor for my coding project.
                Highly recommended!"
              </p>
              <p className="font-bold">- Alex S.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg">
              <p className="text-gray-500 italic">
                "As a helper, I love being able to share my skills and make a
                difference."
              </p>
              <p className="font-bold">- Maria L.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg">
              <p className="text-gray-500 italic">
                "The platform is so easy to use. I found help for my business
                plan in no time!"
              </p>
              <p className="font-bold">- James R.</p>
            </div>
          </div>
        </div>
      </section>
    );
}