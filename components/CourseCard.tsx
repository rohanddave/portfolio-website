import { Course } from "@/types";
import { useState } from "react";

interface CourseCardProps {
  course: Course;
  isLast?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "compact" | "detailed";
}

export default function CourseCard({
  course,
  isLast = false,
  className = "",
  onClick,
  variant = "default",
}: CourseCardProps) {
  const [expanded, setExpanded] = useState(false);

  const baseClasses =
    "relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300";
  const isClickable = onClick !== undefined && !course.isCurrent;

  return (
    <div
      className={`${baseClasses} ${
        isClickable ? "cursor-pointer" : ""
      } ${className}`}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-8 top-full h-6 w-0.5 bg-gray-800"></div>
      )}

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-blue-400 font-semibold">{course.code}</span>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">{course.name}</h3>
            <div className="flex items-center gap-2">
              {course.isCurrent && (
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
                  Current
                </span>
              )}
              <span className="text-sm text-gray-400">{course.semester}</span>
            </div>
          </div>
          <p className="text-gray-400 mb-2">{course.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{course.professor}</span>
            <span>•</span>
            <span>{course.credits} Credits</span>
            {!course.isCurrent && (
              <>
                <span>•</span>
                <span className="text-green-400">Grade: {course.grade}</span>
              </>
            )}
          </div>

          {variant === "detailed" && !course.isCurrent && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {course.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {variant === "compact" && !course.isCurrent && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 mt-2"
            >
              {expanded ? "Show Less" : "Show More"}
              <svg
                className={`w-3 h-3 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
