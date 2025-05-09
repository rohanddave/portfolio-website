import Link from "next/link";
import SkillAnimation from "@/components/SkillAnimation";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import Navigation from "@/components/Navigation";
import EducationSection from "@/components/EducationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LearningSection from "@/components/LearningSection";
import HobbiesSection from "@/components/HobbiesSection";
import ChatBot from "@/components/ChatBot";
import GitHubActivity from "@/components/GitHubActivity";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navigation />
      <ChatBot />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto py-12 sm:py-20"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Rohan Dave
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300">
                Software Engineer | Full-Stack Developer
              </h2>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
              I specialize in building scalable web applications and
              microservices. With a focus on clean code and user experience, I
              transform complex problems into elegant solutions.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link
                href="/resume.pdf"
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
                Download Resume
              </Link>
              <Link
                href="#projects"
                className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors text-sm sm:text-base"
              >
                View Projects
              </Link>
              <Link
                href="#contact"
                className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors text-sm sm:text-base"
              >
                Get in Touch
              </Link>
            </div>

            {/* TODO: Add GitHub Activity */}
            {/* <div className="pt-4">
              <GitHubActivity username="rohanddave" />
            </div> */}
          </div>

          {/* Right Column - Animations */}
          <div className="space-y-8">
            <SkillAnimation />
          </div>
        </div>
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
              href="mailto:your.email@example.com"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm sm:text-base"
            >
              Email Me
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors text-sm sm:text-base"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
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
