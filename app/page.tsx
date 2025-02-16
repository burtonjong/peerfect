import Features from "@/components/landingpage/features";
import GetStarted from "@/components/landingpage/get-started";
import HeroSection from "@/components/landingpage/hero-section";
import SuccessStories from "@/components/landingpage/success-stories";
import WhyPeerfect from "@/components/landingpage/why-peerfect";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <WhyPeerfect />
        <Features />
        <SuccessStories />
        <GetStarted />
      </main>
    </div>
  );
  );
}
