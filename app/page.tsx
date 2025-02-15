import Footer from "@/components/footer";
import Header from "@/components/header";
import Body from "@/components/landingpage/body";
import Body2 from "@/components/landingpage/body2";
import Body3 from "@/components/landingpage/body3";
import Body4 from "@/components/landingpage/body4";
import Body5 from "@/components/landingpage/body5";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Body />
        <Body2 />
        <Body3 />
        <Body4 />
        <Body5 />
      </main>
      <Footer />
    </div>
  );
}
