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
    "relative bg-neutral-50 dark:bg-neutral-900 backdrop-blur-sm rounded-lg p-6 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 card-hover";
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
        <div className="absolute left-8 top-full h-6 w-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
      )}

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-neutral-200 dark:border-neutral-700">
          <span className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">{course.code}</span>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{course.name}</h3>
            <div className="flex items-center gap-2">
              {course.isCurrent && (
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-md font-light">
                  Current
                </span>
              )}
              <span className="text-sm text-neutral-600 dark:text-neutral-400 font-light">{course.semester}</span>
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 mb-2 text-sm font-light">{course.description}</p>
          <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 font-light">
            <span>{course.professor}</span>
            <span>•</span>
            <span>{course.credits} Credits</span>
            {!course.isCurrent && (
              <>
                <span>•</span>
                <span className="text-green-500 dark:text-green-400">Grade: {course.grade}</span>
              </>
            )}
          </div>

          {variant === "detailed" && !course.isCurrent && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {course.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md text-xs font-light border border-neutral-200 dark:border-neutral-700"
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
              className="text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 smooth-transition flex items-center gap-1 mt-2 font-light"
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
