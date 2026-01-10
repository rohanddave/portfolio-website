"use client";

import { useEffect, useState, useRef } from "react";
import { Project } from "@/types";
import ProjectCard from "./ProjectCard";
import { FolderOpen } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        if (!response.ok) {
          throw new Error("Failed to fetch projects data");
        }
        const data = await response.json();
        setProjects(data.projects);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading projects data:", error);
        setError("Failed to load projects data.");
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (isLoading || projects.length === 0) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const cards = grid.querySelectorAll(".project-card");

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(header, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Staggered cards animation
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isLoading, projects]);

  // Sort: featured first
  const sortedProjects = [...projects].sort(
    (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
  );

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-500 text-sm">Loading projects...</div>
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
    <section
      ref={sectionRef}
      data-section="projects"
      className="min-h-screen py-24 px-6 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <FolderOpen className="w-5 h-5 text-neutral-600" />
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-600">
              Projects
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight mb-4">
                Projects I've Built
              </h2>
              <p className="text-neutral-500 max-w-lg">
                A selection of projects I've worked on, from AI-powered
                applications to full-stack platforms.
              </p>
            </div>

            <span className="text-sm text-neutral-600">
              {projects.length} projects
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
