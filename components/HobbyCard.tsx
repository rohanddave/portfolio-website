import { Hobby } from "@/types/hobby";

interface HobbyCardProps {
  hobby: Hobby;
}

export default function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{hobby.icon}</span>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {hobby.name}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {hobby.description}
          </p>
        </div>
      </div>
    </div>
  );
}
