export interface Skill {
  name: string;
  proficiency: string;
  description: string;
  subSkills?: {
    name: string;
    proficiency: string;
    description: string;
  }[];
}

export interface SkillsData {
  proficiencyScale: {
    [key: string]: string;
  };
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
  education?: string;
  course?: string;
  experience?: string;
  categories: string[];
  isFeatured: boolean;
  projectStatus?:
    | "live_maintained"
    | "in_development"
    | "completed_archived"
    | "concept"
    | "beta"
    | "deprecated";
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
  start_date: string;
  end_date: string;
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

export interface Profile {
  name: string;
  title: string;
  openToRoles: string[];
  summary: string;
  links: {
    resume: string;
    projects: string;
  };
}
