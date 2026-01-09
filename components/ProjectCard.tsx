"use client";

import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.link || "#"}
      target={project.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="project-card block group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden rounded-lg mb-4">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
            <span className="text-2xl font-bold text-neutral-700">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <ArrowUpRight className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-white mb-1 group-hover:text-neutral-300 transition-colors">
        {project.title}
      </h3>

      {/* Tech */}
      <p className="text-xs text-neutral-600">
        {project.tech.slice(0, 3).join(" · ")}
      </p>
    </a>
  );
}
