"use client";

import { useState, useEffect, useRef } from "react";
import { Education } from "@/types";
import {
  Calendar,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type EducationCardProps = {
  education: Education;
  index: number;
  total: number;
};

export default function EducationCard({
  education,
  index,
  total,
}: EducationCardProps) {
  const [showCourses, setShowCourses] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!showCourses || !scrollContainer || education.allCourses.length === 0)
      return;

    let scrollPosition = 0;
    const scrollSpeed = 0.8;

    const startScroll = () => {
      intervalRef.current = setInterval(() => {
        if (!scrollContainer) return;
        scrollPosition += scrollSpeed;
        if (
          scrollPosition >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }, 30);
    };

    const stopScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const timer = setTimeout(startScroll, 500);
    scrollContainer.addEventListener("mouseenter", stopScroll);
    scrollContainer.addEventListener("mouseleave", startScroll);

    return () => {
      clearTimeout(timer);
      stopScroll();
      scrollContainer.removeEventListener("mouseenter", stopScroll);
      scrollContainer.removeEventListener("mouseleave", startScroll);
    };
  }, [showCourses, education.allCourses.length]);

  return (
    <div className="edu-card flex-shrink-0 w-screen h-screen flex flex-col bg-neutral-950">
      {/* Main Content - Grows to fill space */}
      <div className="flex-1 flex items-center pb-12">
        <div className="edu-card-content w-full max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-20">
            {/* Left Column - Main Info */}
            <div className="edu-card-left flex-1 max-w-xl">
              {/* Index */}
              <div className="flex items-center gap-3 mb-10">
                <span className="text-sm font-mono text-neutral-500">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
                {education.isCurrent && (
                  <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider border border-neutral-700 text-neutral-400 rounded">
                    Current
                  </span>
                )}
              </div>

              {/* Institution */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight mb-3">
                {education.institution}
              </h2>

              {/* Degree */}
              <h3 className="text-lg lg:text-xl text-neutral-500 mb-8">
                {education.degree}
              </h3>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-neutral-600">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {education.period}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {education.location}
                </span>
                {education.gpa && (
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {education.gpa}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-base text-neutral-400 leading-relaxed">
                {education.description}
              </p>
            </div>

            {/* Right Column - Achievements */}
            <div className="edu-card-right w-full lg:w-72 flex-shrink-0 lg:self-center">
              {education.achievements.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-medium uppercase tracking-widest text-neutral-700 mb-4">
                    Achievements
                  </h3>
                  <div className="space-y-3">
                    {education.achievements
                      .slice(0, 3)
                      .map((achievement, i) => (
                        <div
                          key={i}
                          className="edu-achievement flex items-start gap-2"
                        >
                          <Award className="w-4 h-4 text-neutral-700 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-neutral-400 leading-relaxed">
                            {achievement}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Courses Strip - Fixed at bottom using flex */}
      <div className="flex-shrink-0 pb-16">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
          {/* View Courses Button */}
          <div className="flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-20">
            <div className="flex-1 max-w-xl">
              {education.allCourses.length > 0 && (
                <button
                  onClick={() => setShowCourses(!showCourses)}
                  className="flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors mb-4"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {showCourses ? "Hide" : "View"} Courses (
                    {education.allCourses.length})
                  </span>
                  {showCourses ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full lg:w-72 flex-shrink-0 hidden lg:block" />
          </div>
        </div>

        {/* Courses Content */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            showCourses ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 mb-3">
            <div className="flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-20">
              <div className="flex-1 max-w-xl flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-700">
                  Coursework
                </span>
                <span className="text-[10px] text-neutral-800">
                  Hover to pause
                </span>
              </div>
              <div className="w-full lg:w-72 flex-shrink-0 hidden lg:block" />
            </div>
          </div>

          {/* Horizontal Scrolling Courses */}
          <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-20">
              <div className="flex-1 max-w-xl overflow-visible">
                <div
                  ref={scrollRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-[calc(50vw-50%)] pr-6 lg:pr-12"
                >
                  {education.allCourses.map((course, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-64 px-4 py-3 bg-neutral-900/50 border border-neutral-800/50 rounded-xl hover:border-neutral-700 hover:bg-neutral-900 transition-all"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-neutral-700">
                            {course.code}
                          </span>
                          {course.isCurrent && (
                            <span className="px-1 py-0.5 text-[8px] uppercase tracking-wider text-neutral-500 bg-neutral-800 rounded">
                              Now
                            </span>
                          )}
                        </div>
                        {course.grade && (
                          <span className="text-[10px] font-mono text-neutral-600">
                            {course.grade}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-medium text-neutral-300 truncate mb-2">
                        {course.name}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {course.topics.slice(0, 2).map((topic) => (
                          <span
                            key={topic}
                            className="px-1.5 py-0.5 text-[9px] text-neutral-600 bg-neutral-800/50 rounded"
                          >
                            {topic}
                          </span>
                        ))}
                        {course.topics.length > 2 && (
                          <span className="text-[9px] text-neutral-700">
                            +{course.topics.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-72 flex-shrink-0 hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
