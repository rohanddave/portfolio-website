"use client";

import { useEffect, useState } from "react";
import { Experience, ExperiencesData } from "../types";
import { ExperienceCard } from "./ExperienceCard";

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
        <div key={experience.company} className="relative">
          {/* Timeline connector */}
          {index < experiences.length - 1 && (
            <div className="absolute left-8 top-full h-8 w-0.5 bg-gray-800"></div>
          )}
          <ExperienceCard experience={experience} showAllAchievements={false} />
        </div>
      ))}
    </div>
  );
}
