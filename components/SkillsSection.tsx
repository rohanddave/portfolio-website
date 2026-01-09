"use client";
import { useEffect, useState } from "react";
import { Domain, SkillsData } from "@/types";
import SkillCard from "./SkillCard";
import { Sparkles } from "lucide-react";

function SkillsSection() {
  const [skillsData, setSkillsData] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/data/skills.json");
        if (!response.ok) {
          throw new Error("Failed to fetch skills data");
        }
        const data: SkillsData = await response.json();
        setSkillsData(data.domains);
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
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-500 text-sm">Loading skills...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-sm">{error}</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 border-t border-neutral-800">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-4 h-4 text-neutral-600" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-600">
              My Stack
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight mb-16">
            Skills & Technologies
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="space-y-16">
          {skillsData.map((category) => (
            <div
              key={category.name}
              className="skill-category grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-20"
            >
              {/* Category Name */}
              <div className="flex-shrink-0">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 uppercase tracking-tight leading-tight">
                  {category.name}
                </h2>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
