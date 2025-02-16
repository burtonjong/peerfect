import Features from "@/components/landingpage/features";
import GetStarted from "@/components/landingpage/get-started";
import HeroSection from "@/components/landingpage/hero-section";
import WhyPeerfect from "@/components/landingpage/why-peerfect";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <WhyPeerfect />
        <Features />
        <GetStarted />
      </main>
    </div>
  );
}
