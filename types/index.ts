export interface Skill {
  name: string;
  level: number;
  description: string;
}

export interface SkillsData {
  skills: Skill[];
}

export interface Achievement {
  title: string;
  description: string;
  impact: string;
}

export interface AchievementsData {
  achievements: Achievement[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  image?: string;
}

export interface ProjectsData {
  projects: Project[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  linkedin: string;
  experience: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  relevant_achievements: string[];
  all_achievements: string[];
  technologies: string[];
  logo: string;
  testimonials?: Testimonial[];
}

export interface ExperiencesData {
  experiences: Experience[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  image: string;
  description: string;
  gpa: string;
  isCurrent: boolean;
  achievements: string[];
  relevantCourses: string[];
  allCourses: Course[];
}

export interface Course {
  name: string;
  code: string;
  semester: string;
  professor: string;
  grade: string;
  credits: number;
  description: string;
  projects: Project[];
  topics: string[];
  learnings: string[];
  isCurrent: boolean;
  startDate: string;
  endDate?: string;
}

export interface EducationData {
  education: Education[];
}

export interface TestimonialsData {
  testimonials: Testimonial[];
}

export interface LearningResource {
  name: string;
  platform: string;
  url: string;
}

export interface Learning {
  id: number;
  topic: string;
  description: string;
  progress: number;
  resources: LearningResource[];
  goals: string[];
  icon: string;
}

export interface LearningData {
  learning: Learning[];
}

export interface Hobby {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface HobbiesData {
  hobbies: Hobby[];
}
