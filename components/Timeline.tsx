"use client";

import Hero from "./Hero";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectSection";
import TestimonialsSection from "./TestimonialSection";

export default function Timeline() {
  return (
    <div id="smooth-wrapper" className="bg-neutral-950">
      <div id="smooth-content">
        <Hero />

        {/* Work Experience */}
        <ExperienceSection />

        {/* Projects */}
        <ProjectsSection />

        {/* Education */}
        <EducationSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Skills */}
        <SkillsSection />
      </div>
    </div>
  );
}
