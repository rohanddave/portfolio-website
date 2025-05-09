"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface FoundingData {
  title: string;
  company: {
    name: string;
    url: string;
  };
  description: string;
  achievements: {
    title: string;
    items: string[];
  };
  impact: {
    title: string;
    items: string[];
  };
}

export default function FoundingExperience() {
  const [data, setData] = useState<FoundingData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/founding.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching founding experience data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
      <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {data.title}
            </h2>
            <Link
              href={data.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Visit {data.company.name} →
            </Link>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">{data.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-200">
                  {data.achievements.title}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {data.achievements.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-200">
                  {data.impact.title}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {data.impact.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
