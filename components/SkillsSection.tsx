"use client";

import { useEffect, useState } from "react";
import { Skill, SkillsData } from "../types";

// Emoji mappings for main skills
const skillEmojis: { [key: string]: string } = {
  "Backend Development": "⚙️",
  "Frontend Development": "🎨",
  "AI & Machine Learning": "🤖",
  "Cloud & Infrastructure": "☁️",
  "Mobile Development": "📱",
};

// Emoji mappings for sub-skills
const subSkillEmojis: { [key: string]: string } = {
  // Backend
  TypeScript: "📘",
  Java: "☕",
  Golang: "🦫",
  "Node.js": "🟢",
  "System Design": "🏗️",
  "Database Systems": "🗄️",

  // Frontend
  React: "⚛️",
  "Next.js": "▲",
  "HTML5 & CSS3": "🎯",
  JavaScript: "📜",
  "State Management": "🔄",

  // AI & ML
  "LLMs & Transformers": "🧠",
  "RAG Systems": "🔍",
  "Agentic AI": "🤖",
  "Deep Learning": "📊",
  "Python ML Stack": "🐍",
  "NLP & Computer Vision": "👁️",

  // Cloud & Infrastructure
  "AWS Core Services": "☁️",
  "AWS Advanced Services": "⚡",
  "Serverless Architecture": "⚡",
  Containerization: "📦",
  "Infrastructure as Code": "🏗️",
  "DevOps & CI/CD": "🔄",

  // Mobile
  "React Native": "📱",
  Swift: "🍎",
  Flutter: "🦋",
  "Mobile Architecture": "🏛️",
  "Mobile Testing": "🧪",
};

// Proficiency level colors (solid colors for light/dark mode)
const proficiencyColors: { [key: string]: string } = {
  EXPERT: "bg-green-600 dark:bg-green-500",
  ADVANCED: "bg-blue-600 dark:bg-blue-500",
  INTERMEDIATE: "bg-purple-600 dark:bg-purple-500",
  BASIC: "bg-neutral-600 dark:bg-neutral-500",
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [proficiencyScale, setProficiencyScale] = useState<{
    [key: string]: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/data/skills.json");
        const data: SkillsData = await response.json();
        setSkills(data.skills);
        setProficiencyScale(data.proficiencyScale);
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
    <div className="space-y-6">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="bg-neutral-50 dark:bg-neutral-900 backdrop-blur-sm rounded-lg p-8 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 card-hover"
        >
          {/* Main Skill Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                {skill.name}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1 text-sm font-light">{skill.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-md text-xs font-light ${
                  proficiencyColors[skill.proficiency]
                } text-white`}
              >
                {skill.proficiency}
              </span>
            </div>
          </div>

          {/* Sub-skills Grid */}
          {skill.subSkills && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              {skill.subSkills.map((subSkill) => (
                <div
                  key={subSkill.name}
                  className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 hover:bg-neutral-200 dark:hover:bg-neutral-750 smooth-transition border border-neutral-200 dark:border-neutral-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-light text-neutral-700 dark:text-neutral-300 text-sm">
                      {subSkill.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs font-light ${
                        proficiencyColors[subSkill.proficiency]
                      } text-white`}
                    >
                      {subSkill.proficiency}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-500 font-light leading-relaxed">
                    {subSkill.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
