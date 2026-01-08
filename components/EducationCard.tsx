import { Education } from "@/types";
import Image from "next/image";
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
      className={`relative bg-neutral-50 dark:bg-neutral-900 backdrop-blur-sm rounded-lg p-8 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 card-hover group ${className}`}
    >
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-8 top-full h-8 w-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
      )}

      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Left column - Institution Image and Info */}
        <div className="md:w-1/3">
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={edu.image}
              alt={edu.institution}
              fill
              className="object-contain group-hover-scale"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
            {edu.institution}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1 font-light">{edu.period}</p>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm mt-1 font-light">{edu.location}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-neutral-600 dark:text-neutral-400 font-light">GPA: {edu.gpa}</span>
            {edu.isCurrent && (
              <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-md font-light">
                Current
              </span>
            )}
          </div>
        </div>

        {/* Right column - Degree, Description, and Details */}
        <div className="md:w-2/3">
          <h4 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{edu.degree}</h4>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2 font-light">{edu.description}</p>

          {/* Achievements */}
          <div className="mt-4">
            <h5 className="text-sm font-light text-neutral-600 dark:text-neutral-400 mb-2">
              Key Achievements
            </h5>
            <ul className="space-y-2">
              {edu.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neutral-400 dark:text-neutral-600 mt-1">•</span>
                  <span className="text-neutral-600 dark:text-neutral-400 text-sm font-light">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="mt-6">
            <h5 className="text-sm font-light text-neutral-600 dark:text-neutral-400 mb-2">
              Relevant Courses
            </h5>
            <div className="flex flex-wrap gap-2">
              {edu.relevantCourses.map((course) => (
                <span
                  key={course}
                  className="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md text-xs font-light border border-neutral-200 dark:border-neutral-700"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
