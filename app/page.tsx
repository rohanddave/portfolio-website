"use client";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import Navigation from "@/components/Navigation";
import EducationSection from "@/components/EducationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LearningSection from "@/components/LearningSection";
import HobbiesSection from "@/components/HobbiesSection";
import ChatBot from "@/components/ChatBot";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import ScrollProgress from "@/components/ScrollProgress";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <ScrollProgress />
      {/* <ChatBot /> */}

      {/* Main content with large gaps between sections */}
      <div className="flex flex-col gap-24 lg:gap-32">
        <FadeIn>
          <Timeline />
        </FadeIn>
        {/* Experience Section */}
        {/* <FadeIn>
          <section
            id="experience"
            className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-medium mb-12 sm:mb-16 text-neutral-900 dark:text-neutral-100 tracking-tight">
              Experience
            </h2>
            <ExperienceSection />
          </section>
        </FadeIn> */}

        {/* Projects Section */}
        {/* <FadeIn delay={100}>
          <section
            id="projects"
            className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-medium mb-12 sm:mb-16 text-neutral-900 dark:text-neutral-100 tracking-tight">
              Featured Projects
            </h2>
            <ProjectsSection />
          </section>
        </FadeIn> */}

        {/* Skills Section */}
        {/* <FadeIn delay={100}>
          <section
            id="skills"
            className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-medium mb-12 sm:mb-16 text-neutral-900 dark:text-neutral-100 tracking-tight">
              Skills
            </h2>
            <SkillsSection />
          </section>
        </FadeIn> */}

        {/* Education Section */}
        {/* <FadeIn delay={100}>
          <section
            id="education"
            className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-medium mb-12 sm:mb-16 text-neutral-900 dark:text-neutral-100 tracking-tight">
              Education
            </h2>
            <EducationSection />
          </section>
        </FadeIn> */}

        {/* Testimonials Section */}
        {/* <FadeIn delay={100}>
          <section
            id="testimonials"
            className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-medium mb-12 sm:mb-16 text-neutral-900 dark:text-neutral-100 tracking-tight">
              Testimonials
            </h2>
            <TestimonialsSection />
          </section>
        </FadeIn> */}

        {/* Learning Section */}
        {/* <FadeIn delay={100}>
          <section
            id="learning"
            className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-medium mb-12 sm:mb-16 text-neutral-900 dark:text-neutral-100 tracking-tight">
              Currently Learning
            </h2>
            <LearningSection />
          </section>
        </FadeIn> */}

        {/* Hobbies Section */}
        {/* <FadeIn delay={100}>
          <section
            id="hobbies"
            className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-medium mb-12 sm:mb-16 text-neutral-900 dark:text-neutral-100 tracking-tight">
              Hobbies & Interests
            </h2>
            <HobbiesSection />
          </section>
        </FadeIn> */}

        {/* Contact Section */}
        {/* <FadeIn delay={100}>
          <section
            id="contact"
            className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto pb-24 lg:pb-32"
          >
            <h2 className="text-3xl sm:text-4xl font-medium mb-12 sm:mb-16 text-neutral-900 dark:text-neutral-100 tracking-tight">
              Get in Touch
            </h2>
            <div className="bg-neutral-50 dark:bg-neutral-900 backdrop-blur-sm rounded-lg p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-[transform,border-color] duration-[150ms,700ms] hover:scale-[1.01]">
              <p className="mb-8 sm:mb-10 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:dave.ro@northeastern.edu"
                  className="px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 rounded-md transition-[transform,background-color] duration-[150ms,700ms] hover:scale-[1.02] text-sm font-medium"
                >
                  Email Me
                </a>
                <a
                  href="https://github.com/rohanddave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:bg-neutral-800 rounded-md transition-[transform,background-color] duration-[150ms,700ms] hover:scale-[1.02] text-sm text-neutral-700 dark:text-neutral-300"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/rohandewangdave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:bg-neutral-800 rounded-md transition-[transform,background-color] duration-[150ms,700ms] hover:scale-[1.02] text-sm text-neutral-700 dark:text-neutral-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </section>
        </FadeIn> */}
      </div>
    </div>
  );
}
