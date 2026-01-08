"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Profile } from "@/types";
import TypeWriter from "@/components/TypeWriter";
import { useParallaxScroll } from "@/hooks/useScrollAnimation";

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollY = useParallaxScroll();

  useEffect(() => {
    getProfileData();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getProfileData = async () => {
    const response = await fetch("/data/profile.json");
    const data = await response.json();
    setProfile(data);
  };

  if (!profile) return null;

  const parallaxOffset = scrollY * 0.5;

  return (
    <section
      id="home"
      className="min-h-[90vh] flex items-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto relative overflow-hidden"
    >
      {/* Parallax background elements */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neutral-200 dark:bg-neutral-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neutral-300 dark:bg-neutral-700 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div
        className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 transition-transform duration-700">
            {profile.name}
          </h1>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 font-light">
              <TypeWriter text={profile.openToRoles} />
            </h2>
          </div>
        </div>

        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed font-light">
          {profile.summary}
        </p>

        <div className="flex gap-3 pt-4">
          <Link
            href={profile.links.resume}
            className="px-8 py-3 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 rounded-md transition-[transform,background-color] duration-[150ms,700ms] hover:scale-[1.02] font-medium"
          >
            Resume
          </Link>
          <Link
            href={profile.links.projects}
            className="px-8 py-3 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:bg-neutral-900 rounded-md transition-[transform,background-color] duration-[150ms,700ms] hover:scale-[1.02] text-neutral-700 dark:text-neutral-300"
          >
            Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
