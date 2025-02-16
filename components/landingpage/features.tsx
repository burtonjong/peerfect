
export default function Body3() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">
                  For Those Seeking Help
                </h3>
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
    );
}
