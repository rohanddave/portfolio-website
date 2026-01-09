"use client";

import { Skill } from "@/types";

type SkillCardProps = {
  skill: Skill;
};

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="skill-card flex items-center gap-3 group">
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-neutral-800/50 flex items-center justify-center overflow-hidden group-hover:bg-neutral-800 transition-colors">
        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-6 h-6 object-contain"
          />
        ) : (
          <span className="text-xs font-bold text-neutral-500">
            {skill.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Name */}
      <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">
        {skill.name}
      </span>
    </div>
  );
}
