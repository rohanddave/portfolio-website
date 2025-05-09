import { Education } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface EducationCardProps {
  education: Education;
  isLast?: boolean;
  className?: string;
}

export default function EducationCard({
  education: edu,
  isLast = false,
  className = "",
}: EducationCardProps) {
  // Sort all courses chronologically
  const sortedAllCourses = useMemo(() => {
    return [...edu.allCourses].sort((a, b) => {
      // Current courses should appear first
      if (a.isCurrent && !b.isCurrent) return -1;
      if (!a.isCurrent && b.isCurrent) return 1;

      // For completed courses, sort by end date (most recent first)
      if (!a.isCurrent && !b.isCurrent) {
        return new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime();
      }

      // For current courses, sort by start date
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  }, [edu.allCourses]);

  return (
    <div
      className={`relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 ${className}`}
    >
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-8 top-full h-8 w-0.5 bg-gray-800"></div>
      )}

      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Left column - Institution Image and Info */}
        <div className="md:w-1/3">
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={edu.image}
              alt={edu.institution}
              fill
              className="object-contain bg-gray-800/50"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <Link
            href={`/education/${encodeURIComponent(edu.institution)}`}
            className="group"
          >
            <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
              {edu.institution}
            </h3>
          </Link>
          <p className="text-gray-400 mt-1">{edu.period}</p>
          <p className="text-gray-500 text-sm mt-1">{edu.location}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-gray-300">GPA: {edu.gpa}</span>
            {edu.isCurrent && (
              <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
                Current
              </span>
            )}
          </div>
        </div>

        {/* Right column - Degree, Description, and Details */}
        <div className="md:w-2/3">
          <h4 className="text-lg font-medium text-gray-200">{edu.degree}</h4>
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
              {edu.relevantCourses.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                >
                  {course}
                </span>
              ))}
            </div>
            <Link
              href={`/education/${encodeURIComponent(edu.institution)}`}
              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-3"
            >
              View Detailed Course Information
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
