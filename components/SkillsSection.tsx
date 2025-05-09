"use client";

import { useEffect, useState } from "react";
import { Skill, SkillsData } from "../types";

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/data/skills.json");
        const data: SkillsData = await response.json();
        setSkills(data.skills);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading skills:", error);
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 animate-pulse"
          >
            <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
        >
          <h3 className="text-xl font-semibold mb-3">{skill.name}</h3>
          <p className="text-gray-400 mb-4">{skill.description}</p>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${skill.level}%` }}
            />
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm text-blue-400">{skill.level}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
