import type { Metadata } from "next";
import { HeroSection } from "@/components/hero/HeroSection";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";

// Requirements: 12.3, 12.4
export const metadata: Metadata = buildMetadata({
  title: "Abhishek Sharma — Software Developer & AI Enthusiast",
  description:
    "Portfolio of Abhishek Sharma — full-stack developer and AI enthusiast building intelligent systems, developer tools, and real-time applications.",
  path: "/",
});

/**
 * Homepage — assembles all sections in order.
 * Requirements: 3.3, 12.3, 12.4
 */
export default function Home() {
  return (
    <main>
      {/* Hero */}
      <HeroSection />

      {/* Projects bento grid — BentoGrid renders id="projects" internally */}
      <BentoGrid projects={projects} />

      {/* Skills */}
      <SkillsSection />

      {/* Research */}
      <ResearchSection />

      {/* Experience & Education */}
      <ExperienceSection />

      {/* Achievements */}
      <AchievementsSection />

      {/* About — id="about" anchor for header nav */}
      <AboutSection />

      {/* Contact — id="contact" anchor for header nav */}
      <ContactSection />
    </main>
  );
}
