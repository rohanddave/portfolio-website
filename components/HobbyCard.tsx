import { Hobby } from "@/types";

interface HobbyCardProps {
  hobby: Hobby;
}

export default function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 backdrop-blur-sm rounded-lg p-6 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 card-hover">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{hobby.icon}</span>
        <div>
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">{hobby.name}</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm font-light">{hobby.description}</p>
        </div>
      </div>
    </div>
  );
}
