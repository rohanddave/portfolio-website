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
    "bg-neutral-50 dark:bg-neutral-900 backdrop-blur-sm rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 card-hover group";
  const variantClasses = {
    default: "p-8",
    compact: "p-4",
    detailed: "p-6",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className} group`}>
      {showImage && project.image && (
        <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover-scale"
          />
        </div>
      )}

      <h3
        className={`font-medium text-neutral-900 dark:text-neutral-100 ${
          variant === "compact" ? "text-lg" : "text-xl"
        } mb-2`}
      >
        {project.title}
      </h3>

      {project.projectStatus && (
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-light ${getStatusColor(
              project.projectStatus
            )}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
            {formatStatus(project.projectStatus)}
          </span>
        </div>
      )}

      <p
        className={`text-neutral-600 dark:text-neutral-400 font-light ${
          variant === "compact" ? "text-sm" : ""
        } mb-6 leading-relaxed`}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className={`px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md ${
              variant === "compact" ? "text-xs" : "text-xs"
            } font-light border border-neutral-200 dark:border-neutral-700`}
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
          className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 smooth-transition text-sm font-light group-hover:gap-2"
        >
          View Project
          <svg
            className="w-3.5 h-3.5 smooth-transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
