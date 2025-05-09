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

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ExperiencesData {
  experiences: Experience[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  courses: string[];
}

export interface EducationData {
  education: Education[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
  linkedin: string;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
  linkedin: string;
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
  activities: string[];
  equipment?: string[];
  gallery?: string[];
  achievements?: string[];
  specialties?: string[];
  favorite_recipes?: string[];
  current_books?: string[];
  favorite_authors?: string[];
}

export interface HobbiesData {
  hobbies: Hobby[];
}
