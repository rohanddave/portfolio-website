"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatProps = {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
};

export default function AnimatedStat({
  value,
  suffix,
  label,
  delay = 0,
}: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={statRef}
      className={`text-center transition-all duration-1000 backdrop-blur-sm bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 hover:border-green-400/30 hover:bg-neutral-900/60 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="text-5xl lg:text-6xl font-bold text-green-400 mb-2 tabular-nums drop-shadow-[0_0_15px_rgba(74,222,128,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(74,222,128,0.7)] transition-all">
        {count}
        <span className="text-green-400">{suffix}</span>
      </div>
      <div className="text-sm lg:text-base text-neutral-300 font-light whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}
