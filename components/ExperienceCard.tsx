"use client";

import { Experience } from "@/types";
import { getDateRange } from "@/utils";
import { Calendar, ChevronRight, MapPin, ArrowUpRight } from "lucide-react";

type ExperienceCardProps = {
  experience: Experience;
  index: number;
  total: number;
};

export default function ExperienceCard({
  experience,
  index,
  total,
}: ExperienceCardProps) {
  const isLatest = index === 0;

  return (
    <div className="exp-card relative flex-shrink-0 w-screen h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Content */}
      <div className="exp-card-content relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl px-6 lg:px-12 gap-12 lg:gap-20">
        {/* Left Column */}
        <div className="exp-card-left flex-1 max-w-xl text-center lg:text-left">
          {/* Index */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
            <span className="text-sm font-mono text-neutral-500">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            {isLatest && (
              <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider border border-neutral-700 text-neutral-400 rounded">
                Current
              </span>
            )}
          </div>

          {/* Role & Company */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight mb-3">
            {experience.role}
          </h2>
          <h3 className="text-lg lg:text-xl text-neutral-500 mb-8">
            {experience.company}
          </h3>

          {/* Meta */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 text-sm text-neutral-600">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {getDateRange(experience.start_date, experience.end_date)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-base text-neutral-400 leading-relaxed mb-10">
            {experience.description}
          </p>

          {/* Achievements */}
          <div className="space-y-3">
            {experience.relevant_achievements.map((achievement, i) => (
              <div
                key={i}
                className="exp-achievement flex items-start gap-3 text-left"
              >
                <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1 text-neutral-600" />
                <span className="text-sm text-neutral-300 leading-relaxed">
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Company Card */}
        <div className="exp-card-right hidden lg:block flex-shrink-0">
          <div className="w-72 p-8 border border-neutral-800 rounded-2xl">
            {/* Logo */}
            <div className="w-16 h-16 rounded-xl border border-neutral-800 p-3 bg-white mx-auto mb-6">
              <img
                src={experience.logo}
                alt={experience.company}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Company Name */}
            <h4 className="text-sm font-medium text-white text-center mb-6">
              {experience.company}
            </h4>

            {/* Divider */}
            <div className="w-full h-px bg-neutral-800 mb-6" />

            {/* Tech Stack */}
            <div className="mb-6">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-neutral-600 mb-3 text-center">
                Technologies
              </span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {experience.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="exp-tech-tag px-2 py-1 text-[11px] text-neutral-500 border border-neutral-800 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {experience.technologies.length > 6 && (
                  <span className="px-2 py-1 text-[11px] text-neutral-600 rounded">
                    +{experience.technologies.length - 6}
                  </span>
                )}
              </div>
            </div>

            {/* Link */}
            <a
              href="#"
              className="flex items-center justify-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-white" : "w-1 bg-neutral-800"
            }`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      {index < total - 1 && (
        <div className="hidden lg:flex absolute right-10 bottom-10 items-center gap-2 text-xs text-neutral-700">
          <span>Scroll</span>
          <span>→</span>
        </div>
      )}

      {/* Mobile Company Badge */}
      <div className="lg:hidden absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 border border-neutral-800 rounded-xl">
        <div className="w-8 h-8 rounded-lg bg-white p-1">
          <img
            src={experience.logo}
            alt={experience.company}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-left">
          <h4 className="text-xs font-medium text-white">
            {experience.company}
          </h4>
          <p className="text-[10px] text-neutral-600">
            {experience.technologies.slice(0, 2).join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
