"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. Import ScrollTrigger
import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/types";

// 2. Register the plugin
gsap.registerPlugin(ScrollTrigger);

function ExperienceSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const stripRef = React.useRef<HTMLDivElement>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch("/data/experience.json");
        const data = await response.json();
        setExperiences(data.experiences);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading experience data:", error);
        setError("Failed to load experience data.");
        setIsLoading(false);
      }
    };

    fetchExperience();
  }, []);

  // GSAP horizontal scroll
  useEffect(() => {
    // Wait for data to load
    if (experiences.length === 0) return;

    const section = sectionRef.current;
    const strip = stripRef.current;

    if (!section || !strip) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const totalWidth = strip.scrollWidth;
        const scrollLength = totalWidth - window.innerWidth;

        // Main horizontal scroll tween
        const scrollTween = gsap.to(strip, {
          x: () => -Math.max(0, scrollLength),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
          },
        });

        // Animate each card
        gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
          const left = card.querySelector(".exp-card-left");
          const right = card.querySelector(".exp-card-right");
          const achievements = card.querySelectorAll(".exp-achievement");
          const techTags = card.querySelectorAll(".exp-tech-tag");

          // Left content - slide from left
          if (left) {
            gsap.fromTo(
              left,
              { opacity: 0, x: -60 },
              {
                opacity: 1,
                x: 0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 85%",
                  end: "left 40%",
                  scrub: 1,
                },
              }
            );
          }

          // Right card - slide from right
          if (right) {
            gsap.fromTo(
              right,
              { opacity: 0, x: 60 },
              {
                opacity: 1,
                x: 0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 80%",
                  end: "left 35%",
                  scrub: 1,
                },
              }
            );
          }

          // Achievements stagger
          if (achievements.length) {
            gsap.fromTo(
              achievements,
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 65%",
                  end: "left 30%",
                  scrub: 1,
                },
              }
            );
          }

          // Tech tags stagger
          if (techTags.length) {
            gsap.fromTo(
              techTags,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                stagger: 0.05,
                ease: "back.out(1.5)",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 55%",
                  end: "left 25%",
                  scrub: 1,
                },
              }
            );
          }
        });
      }, section);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [experiences]); // Re-run when experiences load

  if (isLoading) {
    return (
      <section className="h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-neutral-500">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="h-screen overflow-hidden relative bg-neutral-950"
    >
      {/* Horizontal strip containing all cards */}
      <div ref={stripRef} className="flex h-full will-change-transform">
        {experiences.map((exp, index) => (
          <ExperienceCard
            key={exp.company + index}
            experience={exp}
            index={index}
            total={experiences.length}
          />
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
