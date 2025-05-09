"use client";

import { useState, useEffect } from "react";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface GitHubActivityProps {
  username: string;
}

export default function GitHubActivity({ username }: GitHubActivityProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
              query {
                user(login: "${username}") {
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          date
                          contributionCount
                          color
                        }
                      }
                    }
                  }
                }
              }
            `,
          }),
        });

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        const weeks =
          data.data.user.contributionsCollection.contributionCalendar.weeks;
        const allContributions = weeks.flatMap(
          (week: any) => week.contributionDays
        );
        setContributions(allContributions);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch GitHub activity"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubActivity();
  }, [username]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex gap-0.5">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-800 rounded-[1px]" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-2 bg-red-500/10 rounded text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-2 border border-gray-800">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <h3 className="text-xs font-medium text-white">Activity</h3>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
        >
          View Profile
        </a>
      </div>

      <div className="relative">
        <div className="flex gap-0.5">
          {contributions.map((day, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-[1px] transition-transform hover:scale-110 cursor-pointer"
              style={{
                backgroundColor:
                  day.contributionCount > 0 ? day.color : "#1f2937",
              }}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            />
          ))}
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
            {new Date(hoveredDay.date).toLocaleDateString()}:{" "}
            {hoveredDay.contributionCount} contributions
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-1.5 text-[10px] text-gray-400">
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="flex gap-0.5">
            {["#1f2937", "#0e4429", "#006d32", "#26a641", "#39d353"].map(
              (color, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-[1px]"
                  style={{ backgroundColor: color }}
                />
              )
            )}
          </div>
          <span>More</span>
        </div>
        <span className="text-[8px]">Last 35 days</span>
      </div>
    </div>
  );
}
