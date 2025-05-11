"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const companySlug = experience.company.toLowerCase().replace(/\s+/g, "-");

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
          <div className="w-16 h-16 relative flex-shrink-0">
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              fill
              className="object-contain rounded-lg bg-white/5 p-2 border border-white/10"
            />
          </div>
        )}

        {/* Company Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-white">
                {experience.role}
              </h3>
              <div className="flex items-center text-gray-400">
                <span className="font-medium">{experience.company}</span>
                <span className="mx-2">•</span>
                <span>{experience.location}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              {formatPeriod(experience.start_date, experience.end_date)}
            </div>
          </div>
        </div>
      </div>

      {!isUpcomingOrCurrent() && (
        <>
          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed">
            {experience.description}
          </p>

          {/* Achievements */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-300">
                {showAll ? "All Achievements" : "Key Achievements"}
              </h4>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAll(!showAll);
                }}
                className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-300 hover:bg-white/10 transition-colors border border-white/10"
              >
                {showAll ? "Show Less" : "Show All"}
              </button>
            </div>
            <ul className="space-y-2">
              {achievements.map((achievement: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <span className="text-blue-400 mt-1">•</span>
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
                className="px-2.5 py-0.5 text-xs bg-white/5 text-gray-300 rounded-full border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );

  if (isUpcomingOrCurrent()) {
    return (
      <div className="block w-full bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={`/experience/${companySlug}`}
      className="block w-full bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {cardContent}
    </Link>
  );
}
