import Body from "@/components/landingpage/body"
import Body2 from "@/components/landingpage/body2"
import Body3 from "@/components/landingpage/body3"
import Body4 from "@/components/landingpage/body4"
import Body5 from "@/components/landingpage/body5"
import Footer from "@/components/landingpage/footer"
import Header from "@/components/landingpage/header"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-1">
        <Body/>
        <Body2/>
        <Body3/>
        <Body4/>
        <Body5/>
      </main>
      <Footer/>
    </div>
  )
}
