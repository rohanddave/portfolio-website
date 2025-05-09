import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  className?: string;
  showImage?: boolean;
  variant?: "default" | "compact" | "detailed";
}

export default function ProjectCard({
  project,
  className = "",
  showImage = true,
  variant = "default",
}: ProjectCardProps) {
  const baseClasses =
    "bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300";
  const variantClasses = {
    default: "p-8",
    compact: "p-4",
    detailed: "p-6",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {showImage && project.image && (
        <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h3
        className={`font-semibold ${
          variant === "compact" ? "text-lg" : "text-xl"
        } mb-3`}
      >
        {project.title}
      </h3>

      <p
        className={`text-gray-400 ${
          variant === "compact" ? "text-sm" : ""
        } mb-6`}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className={`px-4 py-2 bg-gray-800 rounded-full ${
              variant === "compact" ? "text-xs" : "text-sm"
            } font-medium`}
          >
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          View Project
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
