"use client";

import Hero from "./Hero";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";

export default function Timeline() {
  return (
    <div id="smooth-wrapper" className="bg-neutral-950">
      <div id="smooth-content">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center">
          <Hero />
        </section>

        {/* Work Experience */}
        <ExperienceSection />

        {/* Education */}
        <EducationSection />

        {/* Skills */}
        <SkillsSection />
      </div>
    </div>
  );
}
