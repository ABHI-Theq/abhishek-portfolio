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
 * Thin horizontal separator between major page sections.
 * Requirement 8.1 — full-width thin border-t line with optional centered label.
 */
function SectionSeparator({ label }: { label?: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative border-t border-[var(--border)] mx-6 lg:mx-8"
    >
      {label && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-[var(--bg-main)] px-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Homepage — assembles all sections in order.
 * Requirements: 3.3, 12.3, 12.4
 */
export default function Home() {
  return (
    <main>
      {/* Hero */}
      <HeroSection />

      <SectionSeparator label="Projects" />

      {/* Projects bento grid — BentoGrid renders id="projects" internally */}
      <BentoGrid projects={projects} />

      <SectionSeparator label="Skills" />

      {/* Skills */}
      <SkillsSection />

      <SectionSeparator label="Research" />

      {/* Research */}
      <ResearchSection />

      <SectionSeparator label="Experience" />

      {/* Experience & Education */}
      <ExperienceSection />

      <SectionSeparator label="Achievements" />

      {/* Achievements */}
      <AchievementsSection />

      <SectionSeparator label="About" />

      {/* About — id="about" anchor for header nav */}
      <AboutSection />

      <SectionSeparator label="Contact" />

      {/* Contact — id="contact" anchor for header nav */}
      <ContactSection />
    </main>
  );
}
