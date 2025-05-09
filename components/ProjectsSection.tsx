"use client";

import { useEffect, useState } from "react";
import { Project, ProjectsData } from "../types";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data: ProjectsData = await response.json();
        setProjects(data.projects);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 animate-pulse"
          >
            <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-full mb-6"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="h-8 bg-gray-800 rounded-full w-24"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
