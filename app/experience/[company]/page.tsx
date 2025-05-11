"use client";

import { useEffect, useState } from "react";
import { Experience, Testimonial, Project } from "@/types";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TestimonialCard } from "@/components/TestimonialCard";
import ProjectCard from "@/components/ProjectCard";

export default function ExperienceDetailsPage() {
  const params = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch experience data
        const experienceResponse = await fetch("/data/experience.json");
        const experienceData = await experienceResponse.json();
        const foundExperience = experienceData.experiences.find(
          (exp: Experience) =>
            exp.company.toLowerCase().replace(/\s+/g, "-") === params.company
        );
        setExperience(foundExperience || null);

        // Fetch testimonials data
        const testimonialsResponse = await fetch("/data/testimonials.json");
        const testimonialsData = await testimonialsResponse.json();
        const filteredTestimonials = testimonialsData.testimonials.filter(
          (testimonial: Testimonial) =>
            testimonial.experience === params.company
        );
        setTestimonials(filteredTestimonials);

        // Fetch projects data
        const projectsResponse = await fetch("/data/projects.json");
        const projectsData = await projectsResponse.json();
        const filteredProjects = projectsData.projects.filter(
          (project: Project) => project.experience === foundExperience?.company
        );
        setProjects(filteredProjects);

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.company]);

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl text-red-500 mb-4">Experience not found</h1>
          <Link
            href="/experience"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Return to Experiences
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/experience"
            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2 mb-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Experiences
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {experience.logo && (
              <div className="w-32 h-32 relative flex-shrink-0">
                <Image
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  fill
                  className="object-contain rounded-lg bg-white/5 p-4 border border-white/10"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {experience.role}
              </h1>
              <h2 className="text-2xl text-blue-400 mb-4">
                {experience.company}
              </h2>
              <div className="flex items-center gap-4 text-gray-400">
                <span>{`${new Date(experience.start_date).toLocaleDateString(
                  "en-US",
                  { month: "short", year: "numeric" }
                )} - ${new Date(experience.end_date).toLocaleDateString(
                  "en-US",
                  { month: "short", year: "numeric" }
                )}`}</span>
                <span>•</span>
                <span>{experience.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description and Achievements */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 mb-8">
          <p className="text-gray-300 mb-6">{experience.description}</p>
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Key Achievements
            </h2>
            <ul className="space-y-3">
              {experience.relevant_achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All Achievements */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            All Achievements
          </h2>
          <ul className="space-y-3">
            {experience.all_achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-300">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  variant="detailed"
                />
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">
              Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
