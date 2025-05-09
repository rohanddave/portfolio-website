"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Hobby, HobbiesData } from "../types";

export default function HobbiesSection() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

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
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded" />
              <div className="h-4 bg-gray-700 rounded" />
              <div className="h-4 w-3/4 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hobbies.map((hobby) => (
        <div
          key={hobby.id}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-3xl">{hobby.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-white">{hobby.name}</h3>
              <p className="text-sm text-gray-400">{hobby.description}</p>
            </div>
          </div>

          {/* Activities */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              Activities
            </h4>
            <div className="flex flex-wrap gap-2">
              {hobby.activities.map((activity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>

          {/* Expandable Details */}
          <button
            onClick={() =>
              setExpandedId(expandedId === hobby.id ? null : hobby.id)
            }
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            {expandedId === hobby.id ? "Show Less" : "Show More"}
          </button>

          {expandedId === hobby.id && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              {/* Equipment */}
              {hobby.equipment && (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    Equipment
                  </h4>
                  <ul className="space-y-1">
                    {hobby.equipment.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-400 flex items-center space-x-2"
                      >
                        <span className="text-blue-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {hobby.achievements && (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    Achievements
                  </h4>
                  <ul className="space-y-1">
                    {hobby.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-400 flex items-center space-x-2"
                      >
                        <span className="text-green-400">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specialties */}
              {hobby.specialties && (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hobby.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-900/30 rounded-full text-blue-300"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Books */}
              {hobby.current_books && (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    Currently Reading
                  </h4>
                  <ul className="space-y-1">
                    {hobby.current_books.map((book, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-400 flex items-center space-x-2"
                      >
                        <span className="text-purple-400">📖</span>
                        <span>{book}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {hobby.gallery && (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    Gallery
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {hobby.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt={`${hobby.name} gallery image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
