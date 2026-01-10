"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Profile } from "@/types";
import TypeWriter from "@/components/TypeWriter";
import AnimatedStat from "@/components/AnimatedStat";
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

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Content */}
      <div className="min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
        <div
          className={`max-w-2xl space-y-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        >
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              {profile.name}
            </h1>
            <h2 className="text-xl lg:text-2xl text-neutral-300 font-light">
              <TypeWriter text={profile.openToRoles} />
            </h2>
          </div>

          <p className="text-base lg:text-lg text-neutral-400 leading-relaxed font-light max-w-xl">
            {profile.summary}
          </p>

          <div className="flex gap-3 pt-4">
            <Link
              href={profile.links.resume}
              className="px-8 py-3 bg-white text-neutral-900 hover:bg-neutral-200 rounded-lg transition-all duration-150 hover:scale-[1.02] text-sm font-medium shadow-lg"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      {profile.stats && profile.stats.length > 0 && (
        <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-8">
          {profile.stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 300}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-neutral-500 uppercase tracking-wider">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}
