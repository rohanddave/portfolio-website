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

// Proficiency level colors
const proficiencyColors: { [key: string]: string } = {
  EXPERT: "from-green-500 to-emerald-500",
  ADVANCED: "from-blue-500 to-indigo-500",
  INTERMEDIATE: "from-purple-500 to-pink-500",
  BASIC: "from-gray-500 to-gray-600",
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
    <div className="space-y-12">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
        >
          {/* Main Skill Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {skillEmojis[skill.name] || "💡"}
              </span>
              <div>
                <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {skill.name}
                </h3>
                <p className="text-gray-400 mt-1">{skill.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${
                  proficiencyColors[skill.proficiency]
                } text-white`}
              >
                {skill.proficiency}
              </span>
            </div>
          </div>

          {/* Sub-skills Grid */}
          {skill.subSkills && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-800">
              {skill.subSkills.map((subSkill) => (
                <div
                  key={subSkill.name}
                  className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {subSkillEmojis[subSkill.name] || "✨"}
                      </span>
                      <span className="font-medium text-gray-200">
                        {subSkill.name}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${
                        proficiencyColors[subSkill.proficiency]
                      } text-white`}
                    >
                      {subSkill.proficiency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
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
