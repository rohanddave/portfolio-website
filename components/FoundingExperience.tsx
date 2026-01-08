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
      <div className="bg-neutral-50 dark:bg-neutral-900 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 card-hover">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-medium text-neutral-900 dark:text-neutral-100 tracking-tight">
              {data.title}
            </h2>
            <Link
              href={data.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 smooth-transition"
            >
              Visit {data.company.name} →
            </Link>
          </div>

          <div className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-400 font-light">{data.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                  {data.achievements.title}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400 font-light">
                  {data.achievements.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                  {data.impact.title}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400 font-light">
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
