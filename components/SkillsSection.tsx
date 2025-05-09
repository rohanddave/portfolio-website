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
              <span className="text-2xl font-bold text-blue-400">
                {skill.level}%
              </span>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Skill Progress Bar */}
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${skill.level}%` }}
            />
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
                    <span className="text-sm text-blue-400">
                      {subSkill.level}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    {subSkill.description}
                  </p>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${subSkill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
