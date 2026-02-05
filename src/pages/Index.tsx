import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import BackToTop from "@/components/BackToTop";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";
import LightRays from "@/components/LightRays";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Background - fixed, full viewport, behind everything */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div
        className={`relative z-0 ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
};

export default Index;
