import { ExperienceCard } from "@/components/ExperienceCard";
import experienceData from "@/public/data/experience.json";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Work Experience</h1>
          <p className="text-muted-foreground">
            A detailed overview of my professional journey and achievements
          </p>
        </div>

        <div className="grid gap-6">
          {experienceData.experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              showAllAchievements={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
