"use client";

import { useState, useEffect } from "react";
import { Learning, LearningData } from "../types";

export default function LearningSection() {
  const [learning, setLearning] = useState<Learning[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearning = async () => {
      try {
        const response = await fetch("/data/learning.json");
        const data: LearningData = await response.json();
        setLearning(data.learning);
      } catch (error) {
        console.error("Error fetching learning data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearning();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {learning.map((item) => (
          <div
            key={item.id}
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {learning.map((item) => (
        <div
          key={item.id}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-3xl">{item.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-white">{item.topic}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          </div>

          {/* Resources */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              Resources
            </h4>
            <div className="space-y-2">
              {item.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {resource.name} ({resource.platform})
                </a>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Goals</h4>
            <ul className="space-y-1">
              {item.goals.map((goal, index) => (
                <li key={index} className="text-sm text-gray-400">
                  • {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
