"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PipelineSection from "@/components/PipelineSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import DemoShowcase from "@/components/DemoShowcase";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import DemoModal from "@/components/DemoModal";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <GridBackground />
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main>
        <Hero onBookDemo={() => setDemoOpen(true)} />
<PipelineSection />
        <CapabilitiesSection />
        <DemoShowcase />
        <TeamSection />
        <CTASection onBookDemo={() => setDemoOpen(true)} />
      </main>
      <Footer />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
