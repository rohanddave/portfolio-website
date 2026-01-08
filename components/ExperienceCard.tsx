"use client";

import { useState } from "react";
import Image from "next/image";
import { Experience } from "../types";

interface ExperienceCardProps {
  experience: Experience;
  showAllAchievements?: boolean;
}

export function ExperienceCard({
  experience,
  showAllAchievements = false,
}: ExperienceCardProps) {
  const [showAll, setShowAll] = useState(showAllAchievements);
  const achievements = showAll
    ? experience.all_achievements
    : experience.relevant_achievements;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const formatPeriod = (start: string, end: string) => {
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const isUpcomingOrCurrent = () => {
    const today = new Date();
    const startDate = new Date(experience.start_date);
    return startDate >= today;
  };

  const cardContent = (
    <div className="p-6 space-y-6">
      {/* Header with Logo */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        {/* Logo Section */}
        {experience.logo && (
          <div className="w-14 h-14 relative flex-shrink-0">
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              fill
              className="object-contain rounded-lg bg-neutral-100 dark:bg-neutral-800 p-2 border border-neutral-200 dark:border-neutral-700"
            />
          </div>
        )}

        {/* Company Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                {experience.role}
              </h3>
              <div className="flex items-center text-neutral-600 dark:text-neutral-400 text-sm font-light">
                <span>{experience.company}</span>
                <span className="mx-2 text-neutral-400 dark:text-neutral-600">•</span>
                <span>{experience.location}</span>
              </div>
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-500 font-light">
              {formatPeriod(experience.start_date, experience.end_date)}
            </div>
          </div>
        </div>
      </div>

      {!isUpcomingOrCurrent() && (
        <>
          {/* Description */}
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light">
            {experience.description}
          </p>

          {/* Achievements */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-light text-neutral-600 dark:text-neutral-400">
                {showAll ? "All Achievements" : "Key Achievements"}
              </h4>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAll(!showAll);
                }}
                className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 smooth-transition border border-neutral-200 dark:border-neutral-700 font-light"
              >
                {showAll ? "Show Less" : "Show All"}
              </button>
            </div>
            <ul className="space-y-2">
              {achievements.map((achievement: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400 font-light"
                >
                  <span className="text-neutral-400 dark:text-neutral-600 mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech: string, index: number) => (
              <span
                key={index}
                className="px-2.5 py-0.5 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md border border-neutral-200 dark:border-neutral-700 font-light"
              >
                {tech}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="block w-full bg-neutral-50 dark:bg-neutral-900 backdrop-blur-sm rounded-lg border border-neutral-200 dark:border-neutral-800">
      {cardContent}
    </div>
  );
}
