"use client";

import { useEffect, useState } from "react";
import { Experience } from "@/types";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ExperienceDetailsPage() {
  const params = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch("/data/experience.json");
        const data = await response.json();
        const foundExperience = data.experiences.find(
          (exp: Experience) =>
            exp.company.toLowerCase().replace(/\s+/g, "-") === params.company
        );
        setExperience(foundExperience || null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading experience:", error);
        setIsLoading(false);
      }
    };

    fetchExperience();
  }, [params.company]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-800 rounded w-1/4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
            <div className="h-4 bg-gray-800 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Experience Not Found
          </h1>
          <Link
            href="/experience"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Experiences
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link
        href="/experience"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Experiences
      </Link>

      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="md:w-1/3">
            {experience.logo && (
              <div className="w-32 h-32 relative mb-6">
                <Image
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  fill
                  className="object-contain rounded-lg bg-white/5 p-4 border border-white/10"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold text-white mb-2">
              {experience.role}
            </h1>
            <h2 className="text-xl text-blue-400 mb-4">{experience.company}</h2>
            <div className="space-y-2 text-gray-300">
              <p>{experience.period}</p>
              <p>{experience.location}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-2/3 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {experience.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {experience.relevant_achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                All Achievements
              </h3>
              <ul className="space-y-3">
                {experience.all_achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-white/5 text-gray-300 rounded-full border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
