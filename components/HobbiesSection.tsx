"use client";

import { useState, useEffect } from "react";
import { Hobby, HobbiesData } from "../types";
import HobbyCard from "./HobbyCard";

export default function HobbiesSection() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await fetch("/data/hobbies.json");
        const data: HobbiesData = await response.json();
        setHobbies(data.hobbies);
      } catch (error) {
        console.error("Error fetching hobbies data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHobbies();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 animate-pulse"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-700 rounded" />
                <div className="h-3 w-24 bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hobbies.map((hobby) => (
        <HobbyCard key={hobby.id} hobby={hobby} />
      ))}
    </div>
  );
}
