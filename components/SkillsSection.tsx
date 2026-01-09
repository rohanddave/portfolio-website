"use client";

import { useEffect, useState } from "react";
import { Skill, SkillsData } from "@/types";
import SkillCard from "./SkillCard";
import { Sparkles } from "lucide-react";

function SkillsSection() {
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch skills data
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/data/skills.json");
        if (!response.ok) {
          throw new Error("Failed to fetch skills data");
        }
        const data: SkillsData = await response.json();
        setSkillsData(data.skills);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading skills data:", error);
        setError("Failed to load skills data.");
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-neutral-500 text-sm">Loading skills...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-red-500 text-sm">{error}</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-950 py-20 px-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <Sparkles className="w-5 h-5 text-neutral-600" />
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            My Stack
          </span>
        </div>

        {/* Skills Grid */}
        <div className="space-y-16">
          {skillsData.map((category, index) => (
            <div
              key={category.name}
              className="skill-category flex flex-col lg:flex-row gap-8 lg:gap-20"
            >
              {/* Category Name */}
              <div className="lg:w-48 flex-shrink-0">
                <h2 className="text-4xl lg:text-5xl font-bold text-neutral-800 uppercase tracking-tight">
                  {category.name}
                </h2>
              </div>

              {/* Skills */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {category.subSkills?.map((skill, i) => (
                    <SkillCard
                      key={skill.name}
                      skill={{
                        name: skill.name,
                        proficiency: skill.proficiency,
                        description: skill.description,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
