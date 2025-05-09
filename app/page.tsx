"use client";
import Link from "next/link";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import Navigation from "@/components/Navigation";
import EducationSection from "@/components/EducationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LearningSection from "@/components/LearningSection";
import HobbiesSection from "@/components/HobbiesSection";
import ChatBot from "@/components/ChatBot";
import { useEffect, useState } from "react";
import { Profile } from "@/types";
import TypeWriter from "@/components/TypeWriter";

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const response = await fetch("/data/profile.json");
    const data = await response.json();
    setProfile(data);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ChatBot />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-[80vh] flex items-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto"
      >
        {profile && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {profile.name}
                </span>
              </h1>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl text-gray-300">
                  <TypeWriter text={profile.openToRoles} />
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-300 max-w-2xl">{profile.summary}</p>

            <div className="flex gap-4">
              <Link
                href={profile.links.resume}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Resume
              </Link>
              <Link
                href={profile.links.projects}
                className="px-6 py-2 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
              >
                Projects
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Experience
        </h2>
        <ExperienceSection />
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Featured Projects
        </h2>
        <ProjectsSection />
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Skills
        </h2>
        <SkillsSection />
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Education
        </h2>
        <EducationSection />
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Testimonials
        </h2>
        <TestimonialsSection />
      </section>

      {/* Learning Section */}
      <section
        id="learning"
        className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Currently Learning
        </h2>
        <LearningSection />
      </section>

      {/* Hobbies Section */}
      <section
        id="hobbies"
        className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Hobbies & Interests
        </h2>
        <HobbiesSection />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Get in Touch
        </h2>
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300">
          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-gray-300">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="mailto:dave.ro@northeastern.edu"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm sm:text-base"
            >
              Email Me
            </a>
            <a
              href="https://github.com/rohanddave"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors text-sm sm:text-base"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/rohandewangdave"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors text-sm sm:text-base"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
