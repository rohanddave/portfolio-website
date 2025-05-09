"use client";

import { useEffect, useState } from "react";
import { Skill, SkillsData, Achievement, AchievementsData } from "../types";

export default function SkillAnimation() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, achievementsRes] = await Promise.all([
          fetch("/data/skills.json"),
          fetch("/data/achievements.json"),
        ]);

        const skillsData: SkillsData = await skillsRes.json();
        const achievementsData: AchievementsData = await achievementsRes.json();

        setSkills(skillsData.skills);
        setAchievements(achievementsData.achievements);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentAchievement((prev) =>
        prev === achievements.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [achievements.length]);

  if (isLoading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 animate-pulse">
        <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-800 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-800 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Skills Progress */}
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">{skill.name}</span>
              <span className="text-blue-400">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Achievements Carousel */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-200">
            {achievements[currentAchievement]?.title}
          </h3>
        </div>
        <p className="text-gray-400 mb-2">
          {achievements[currentAchievement]?.description}
        </p>
        <p className="text-sm text-blue-400">
          {achievements[currentAchievement]?.impact}
        </p>
      </div>
    </div>
  );
}
