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
    "relative bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300";
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
        <div className="absolute left-8 top-full h-6 w-0.5 bg-white/10"></div>
      )}

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
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
              <span className="text-sm text-gray-300">{course.semester}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-2">{course.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-300">
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
                    className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm border border-white/10"
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
