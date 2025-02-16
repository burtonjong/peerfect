import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <section className="w-full bg-primary py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="font-brand text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
              We store cookies for login only
            </h1>
            <p className="mx-auto max-w-[700px] text-muted md:text-xl">
              Except you email and username
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/">Go back home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
