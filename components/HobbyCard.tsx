import { Hobby } from "@/types";

interface HobbyCardProps {
  hobby: Hobby;
}

export default function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center gap-4">
        <span className="text-4xl text-blue-400">{hobby.icon}</span>
        <div>
          <h3 className="text-xl font-semibold text-white">{hobby.name}</h3>
          <p className="mt-2 text-gray-300">{hobby.description}</p>
        </div>
      </div>
    </div>
  );
}
