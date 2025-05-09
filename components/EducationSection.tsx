"use client";

import { useEffect, useState } from "react";
import { Education, EducationData } from "../types";
import EducationCard from "./EducationCard";

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch("/data/education.json");
        const data: EducationData = await response.json();
        setEducation(data.education);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading education:", error);
        setIsLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 animate-pulse"
          >
            <div className="h-6 bg-gray-800 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/4 mb-6"></div>
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
      {education.map((edu, index) => (
        <EducationCard
          key={edu.institution}
          education={edu}
          isLast={index === education.length - 1}
        />
      ))}
    </div>
  );
}
