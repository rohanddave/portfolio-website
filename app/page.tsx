"use client";
import ScrollProgress from "@/components/ScrollProgress";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <ScrollProgress />

      {/* Main content with large gaps between sections */}
      <div className="flex flex-col gap-24 lg:gap-32">
        <Timeline />
      </div>
    </div>
  );
}
