"use client";

import { useEffect, useState } from "react";
import { Experience, ExperiencesData } from "../types";

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/data/experience.json");
        const data: ExperiencesData = await response.json();
        setExperiences(data.experiences);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading experiences:", error);
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 animate-pulse"
          >
            <div className="h-6 bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/3 mb-6"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-full"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              <div className="h-4 bg-gray-800 rounded w-4/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {experiences.map((experience, index) => (
        <div
          key={experience.company}
          className="relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
        >
          {/* Timeline connector */}
          {index < experiences.length - 1 && (
            <div className="absolute left-8 top-full h-8 w-0.5 bg-gray-800"></div>
          )}

          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Left column - Company and Period */}
            <div className="md:w-1/3">
              <h3 className="text-xl font-semibold text-blue-400">
                {experience.company}
              </h3>
              <p className="text-gray-400 mt-1">{experience.period}</p>
              <p className="text-gray-500 text-sm mt-1">
                {experience.location}
              </p>
            </div>

            {/* Right column - Role, Description, and Achievements */}
            <div className="md:w-2/3">
              <h4 className="text-lg font-medium text-gray-200">
                {experience.role}
              </h4>
              <p className="text-gray-400 mt-2">{experience.description}</p>

              {/* Achievements */}
              <ul className="mt-4 space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2">
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

              {/* Technologies */}
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
