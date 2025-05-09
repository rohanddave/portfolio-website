"use client";

import { useEffect, useState } from "react";
import { Education, EducationData } from "../types";

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
        <div
          key={edu.institution}
          className="relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
        >
          {/* Timeline connector */}
          {index < education.length - 1 && (
            <div className="absolute left-8 top-full h-8 w-0.5 bg-gray-800"></div>
          )}

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Left column - Institution and Period */}
            <div className="md:w-1/3">
              <h3 className="text-xl font-semibold text-blue-400">
                {edu.institution}
              </h3>
              <p className="text-gray-400 mt-1">{edu.period}</p>
              <p className="text-gray-500 text-sm mt-1">{edu.location}</p>
            </div>

            {/* Right column - Degree, Description, and Details */}
            <div className="md:w-2/3">
              <h4 className="text-lg font-medium text-gray-200">
                {edu.degree}
              </h4>
              <p className="text-gray-400 mt-2">{edu.description}</p>

              {/* Achievements */}
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-300 mb-2">
                  Key Achievements
                </h5>
                <ul className="space-y-2">
                  {edu.achievements.map((achievement, i) => (
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
              </div>

              {/* Courses */}
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-300 mb-2">
                  Relevant Courses
                </h5>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
