"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Education, Course, Project } from "@/types";
import ProjectCard from "@/components/ProjectCard";
import CourseCard from "@/components/CourseCard";

export default function EducationDetail() {
  const params = useParams();
  const [education, setEducation] = useState<Education | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [expandedSemesters, setExpandedSemesters] = useState<Set<string>>(
    new Set()
  );
  const [projects, setProjects] = useState<Project[]>([]);

  // Group courses by semester
  const coursesBySemester = useMemo(() => {
    if (!education) return new Map();

    const grouped = new Map<string, Course[]>();
    education.allCourses.forEach((course) => {
      const semester = course.semester;
      if (!grouped.has(semester)) {
        grouped.set(semester, []);
      }
      grouped.get(semester)!.push(course);
    });

    // Sort semesters chronologically
    return new Map(
      [...grouped.entries()].sort((a, b) => {
        const semesterA = parseInt(a[0].split(" ")[1]);
        const semesterB = parseInt(b[0].split(" ")[1]);
        return semesterA - semesterB;
      })
    );
  }, [education]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch("/data/education.json");
        const data = await response.json();
        const institution = decodeURIComponent(params.institution as string);
        const edu = data.education.find(
          (e: Education) => e.institution === institution
        );
        setEducation(edu);

        // Fetch projects after education is loaded
        const projectsResponse = await fetch("/data/projects.json");
        const projectsData = await projectsResponse.json();
        const filteredProjects = projectsData.projects.filter(
          (project: Project) => project.education === institution
        );
        setProjects(filteredProjects);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [params.institution]);

  const toggleSemester = (semester: string) => {
    setExpandedSemesters((prev) => {
      const next = new Set(prev);
      if (next.has(semester)) {
        next.delete(semester);
      } else {
        next.add(semester);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!education) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl text-red-500 mb-4">Education not found</h1>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2 mb-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            {education.institution}
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span>{education.degree}</span>
            <span>•</span>
            <span>{education.period}</span>
            <span>•</span>
            <span>{education.location}</span>
            <span>•</span>
            <span className="text-green-400">GPA: {education.gpa}</span>
            {education.isCurrent && (
              <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
                Current
              </span>
            )}
          </div>
        </div>

        {/* Description and Achievements */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 mb-8">
          <p className="text-gray-300 mb-4">{education.description}</p>
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">
              Key Achievements
            </h2>
            <ul className="space-y-2">
              {education.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Course Timeline */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Course Timeline
          </h2>
          <div className="space-y-6">
            {Array.from(coursesBySemester.entries()).map(
              ([semester, courses]) => (
                <div
                  key={semester}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden"
                >
                  <button
                    onClick={() => toggleSemester(semester)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-semibold text-white">
                        {semester}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {courses.length}{" "}
                        {courses.length === 1 ? "Course" : "Courses"}
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedSemesters.has(semester) ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {expandedSemesters.has(semester) && (
                    <div className="px-6 py-4 space-y-4">
                      {courses.map((course: Course, index: number) => (
                        <CourseCard
                          key={course.code}
                          course={course}
                          isLast={index === courses.length - 1}
                          onClick={() => setSelectedCourse(course)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-8 mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${index}`}
                project={project}
                variant="detailed"
              />
            ))}
          </div>
        </div>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {selectedCourse.name}
                  </h3>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Course Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-300">Course Code:</span>
                      <span className="text-white ml-2">
                        {selectedCourse.code}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-300">Semester:</span>
                      <span className="text-white ml-2">
                        {selectedCourse.semester}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-300">Professor:</span>
                      <span className="text-white ml-2">
                        {selectedCourse.professor}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-300">Credits:</span>
                      <span className="text-white ml-2">
                        {selectedCourse.credits}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-300">Grade:</span>
                      <span className="text-green-400 ml-2">
                        {selectedCourse.grade}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-300">
                      {selectedCourse.description}
                    </p>
                  </div>

                  {/* Topics */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">
                      Topics Covered
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm border border-white/10"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Learnings */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">
                      Key Learnings & Takeaways
                    </h4>
                    <ul className="space-y-2">
                      {selectedCourse.learnings.map((learning, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-300">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Course Projects */}
                  {projects.filter((p) => p.course == selectedCourse.name)
                    .length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-4">
                        Course Projects
                      </h4>
                      <div className="space-y-4">
                        {projects
                          .filter((p) => p.course === selectedCourse.name)
                          .map((project, index) => (
                            <ProjectCard
                              key={`${project.title}-${index}`}
                              project={project}
                              variant="compact"
                              className="!p-4"
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
