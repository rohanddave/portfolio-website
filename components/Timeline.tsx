"use client";

import Hero from "./Hero";
import ExperienceSection from "./ExperienceSection";

export default function Timeline() {
  return (
    <div id="smooth-wrapper" className="bg-[#030303]">
      <div id="smooth-content">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center">
          <Hero />
        </section>

        {/* Work Experience */}
        <ExperienceSection />
      </div>
    </div>
  );
}
