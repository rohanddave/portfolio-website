"use client";

import { Experience } from "@/types";
import { getDateRange, getTechIcon } from "@/utils";
import { Calendar, MapPin } from "lucide-react";

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
      <div className="exp-card-content relative z-10 flex flex-col lg:flex-row items-start justify-center w-full max-w-6xl px-6 lg:px-12 gap-12 lg:gap-20">
        {/* Left Column */}
        <div className="exp-card-left flex-1 max-w-2xl">
          {/* Header Section */}
          <div className="mb-12">
            {/* Index & Status */}
            <div className="flex items-center gap-3 mb-8">
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

            {/* Company Logo & Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl border border-neutral-800 p-2.5 bg-white flex-shrink-0">
                <img
                  src={experience.logo}
                  alt={experience.company}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-white">
                  {experience.company}
                </h3>
                <div className="flex items-center gap-3 text-xs text-neutral-600 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {experience.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Role */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight mb-4">
              {experience.role}
            </h2>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Calendar className="w-4 h-4" />
              {getDateRange(experience.start_date, experience.end_date)}
            </div>
          </div>

          {/* Description */}
          <p className="text-base text-neutral-400 leading-relaxed mb-10">
            {experience.description}
          </p>

          {/* Achievements */}
          <div className="space-y-4 mb-10">
            <h4 className="text-[10px] font-medium uppercase tracking-widest text-neutral-600">
              Key Achievements
            </h4>
            <div className="space-y-3">
              {experience.relevant_achievements.map((achievement, i) => (
                <div key={i} className="exp-achievement flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 flex-shrink-0 mt-2" />
                  <span className="text-sm text-neutral-300 leading-relaxed">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Technologies */}
        <div className="exp-card-right w-full lg:w-96 flex-shrink-0 lg:self-center">
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-widest text-neutral-600 mb-6">
              Technologies Used
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {experience.technologies.map((tech) => {
                const icon = getTechIcon(tech);
                return (
                  <div
                    key={tech}
                    className="exp-tech-tag flex flex-col items-center gap-2 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700 hover:bg-neutral-900 transition-all group"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-neutral-800/50 flex items-center justify-center overflow-hidden">
                      {icon ? (
                        <img
                          src={icon}
                          alt={tech}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold text-neutral-500">
                          {tech.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <span className="text-[11px] text-neutral-500 group-hover:text-white transition-colors text-center leading-tight">
                      {tech}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
