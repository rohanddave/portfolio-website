import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  className?: string;
  showImage?: boolean;
  variant?: "default" | "compact" | "detailed";
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case "in_development":
      return "bg-yellow-500/20 text-yellow-400";
    case "live_maintained":
      return "bg-green-500/20 text-green-400";
    case "completed_archived":
      return "bg-gray-500/20 text-gray-400";
    case "concept":
      return "bg-purple-500/20 text-purple-400";
    case "beta":
      return "bg-orange-500/20 text-orange-400";
    case "deprecated":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const formatStatus = (status?: string) => {
  if (!status) return "";
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function ProjectCard({
  project,
  className = "",
  showImage = true,
  variant = "default",
}: ProjectCardProps) {
  const baseClasses =
    "bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300";
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
        className={`font-semibold text-white ${
          variant === "compact" ? "text-lg" : "text-xl"
        } mb-2`}
      >
        {project.title}
      </h3>

      {project.projectStatus && (
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              project.projectStatus
            )}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-2"></span>
            {formatStatus(project.projectStatus)}
          </span>
        </div>
      )}

      <p
        className={`text-gray-300 ${
          variant === "compact" ? "text-sm" : ""
        } mb-6`}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className={`px-4 py-2 bg-white/5 text-gray-300 rounded-full ${
              variant === "compact" ? "text-xs" : "text-sm"
            } font-medium border border-white/10`}
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
