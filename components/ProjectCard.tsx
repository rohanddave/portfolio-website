"use client";

import { Project } from "@/types";
import { ArrowUpRight, ExternalLink } from "lucide-react";

type ProjectCardProps = {
  project: Project;
  height?: "short" | "medium" | "tall";
};

export default function ProjectCard({ project, height = "medium" }: ProjectCardProps) {
  const heightClasses = {
    short: "h-[280px]",
    medium: "h-[340px]",
    tall: "h-[420px]",
  };

  return (
    <a
      href={project.link || "#"}
      target={project.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`project-card block group ${heightClasses[height]}`}
    >
      <div className="relative h-full bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300">
        {/* Background Pattern/Image */}
        {project.image ? (
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900" />
          </div>
        )}

        {/* Content */}
        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {project.isFeatured && (
                <span className="inline-block px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider bg-neutral-800 text-neutral-400 rounded mb-3">
                  Featured
                </span>
              )}
              <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-neutral-300 transition-colors">
                {project.title}
              </h3>
            </div>
            {project.link && (
              <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors flex-shrink-0 ml-2" />
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-400 leading-relaxed mb-auto line-clamp-3">
            {project.description}
          </p>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-neutral-800/50">
            {/* Categories */}
            {project.categories && project.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.categories.slice(0, 2).map((category) => (
                  <span
                    key={category}
                    className="px-2 py-0.5 text-[10px] text-neutral-500 bg-neutral-800/50 rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1 text-[11px] text-neutral-600">
              {project.tech.slice(0, 4).map((tech, i) => (
                <span key={tech}>
                  {tech}
                  {i < Math.min(project.tech.length, 4) - 1 && " · "}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="text-neutral-700">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </a>
  );
}
