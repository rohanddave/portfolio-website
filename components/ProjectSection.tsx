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
  const contentRef = useRef<HTMLDivElement>(null);

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

  // GSAP ScrollTrigger with pinning
  useEffect(() => {
    if (isLoading || projects.length === 0) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Calculate the scroll distance
        const contentHeight = content.scrollHeight;
        const viewportHeight = window.innerHeight;
        const headerHeight = 180; // Approximate header height
        const maxScroll = contentHeight - viewportHeight + headerHeight;

        // Pin the section and animate content with smooth transform
        gsap.to(content, {
          y: -maxScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.5,
            start: "top top",
            end: () => `+=${maxScroll * 1.5}`,
            invalidateOnRefresh: true,
          },
        });

        // Fade in animation for cards
        const cards = content.querySelectorAll(".project-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
          }
        );
      }, section);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading, projects]);

  // Sort: featured first
  const sortedProjects = [...projects].sort(
    (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
  );

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-neutral-500 text-sm">Loading projects...</div>
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

  // Assign staggered heights to projects
  const getCardHeight = (index: number): "short" | "medium" | "tall" => {
    const pattern = ["medium", "tall", "short", "medium", "short", "tall"];
    return pattern[index % pattern.length] as "short" | "medium" | "tall";
  };

  return (
    <section
      ref={sectionRef}
      data-section="projects"
      className="h-screen bg-neutral-900 overflow-hidden border-t border-neutral-800 relative"
    >
      <div
        ref={contentRef}
        className="will-change-transform"
      >
        <div className="py-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-4 h-4 text-neutral-600" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-600">
                  Projects
                </span>
              </div>
              <span className="text-[10px] text-neutral-700">
                Scroll to explore
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight mb-12">
              Things I've Built
            </h2>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {sortedProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  height={getCardHeight(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
