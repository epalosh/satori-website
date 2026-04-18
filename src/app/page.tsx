import { InvestorsSection, TeamSection } from "@/components/AboutInvestors";
import BookDemo from "@/components/BookDemo";
import Features from "@/components/Features";
import FinalCta from "@/components/FinalCta";
import FlowDiagram from "@/components/FlowDiagram";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LogoWall from "@/components/LogoWall";
import MetaWordmark from "@/components/MetaWordmark";
import Nav from "@/components/Nav";
import SiteBackground from "@/components/SiteBackground";

const LOGIN_URL = "https://app.satori-inference.com/sign-in";
// All "Book a demo" CTAs scroll to the embedded Cal.com scheduler below the team.
const BOOK_DEMO_HREF = "#book-demo";

export default function Home() {
  return (
    <>
      <SiteBackground />
      <Nav loginUrl={LOGIN_URL} demoUrl={BOOK_DEMO_HREF} />
      <Hero demoUrl={BOOK_DEMO_HREF} />
      <LogoWall />
      <HowItWorks />
      <FlowDiagram />
      <Features />
      <TeamSection />
      <BookDemo />
      <InvestorsSection />
      <FinalCta demoUrl={BOOK_DEMO_HREF} />
      <MetaWordmark />
      <Footer />
    </>
  );
}
