"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Profile } from "@/types";
import TypeWriter from "@/components/TypeWriter";

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const response = await fetch("/data/profile.json");
    const data = await response.json();
    setProfile(data);
  };

  if (!profile) return null;

  return (
    <section
      id="home"
      className="min-h-[80vh] flex items-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto"
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {profile.name}
            </span>
          </h1>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-gray-300">
              <TypeWriter text={profile.openToRoles} />
            </h2>
          </div>
        </div>

        <p className="text-lg text-gray-300 max-w-2xl">{profile.summary}</p>

        <div className="flex gap-4">
          <Link
            href={profile.links.resume}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Resume
          </Link>
          <Link
            href={profile.links.projects}
            className="px-6 py-2 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
          >
            Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
