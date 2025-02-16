import { ArrowRight, CheckCircle, Users } from "lucide-react";

export default function Body2() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Why Choose Peerfect?
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-200 p-4">
            <Users className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-bold">Diverse Skill Pool</h3>
            <p className="text-center text-gray-500">
              Access a wide range of skills from our community of helpers.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-200 p-4">
            <CheckCircle className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-bold">Verified Profiles</h3>
            <p className="text-center text-gray-500">
              Trust our community with our thorough verification process.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-200 p-4">
            <ArrowRight className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-bold">Easy Matching</h3>
            <p className="text-center text-gray-500">
              Our smart algorithm connects you with the perfect helper.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
