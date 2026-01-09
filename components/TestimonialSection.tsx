"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Testimonial } from "@/types";
import TestimonialCard from "./TestimonialCard";
import { MessageSquareQuote } from "lucide-react";
import { gsap } from "gsap";

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/data/testimonials.json");
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data.testimonials);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading testimonials:", error);
        setError("Failed to load testimonials.");
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const animateToNext = useCallback(() => {
    if (!cardRef.current || testimonials.length === 0) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      },
    });

    tl.to(cardRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
    });

    timelineRef.current = tl;
  }, [testimonials.length]);

  const animateIn = useCallback(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  // Animate in when index changes
  useEffect(() => {
    if (!isLoading && testimonials.length > 0) {
      animateIn();
    }
  }, [currentIndex, isLoading, testimonials.length, animateIn]);

  // Auto-advance interval
  useEffect(() => {
    if (isLoading || testimonials.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      animateToNext();
    }, 5000);

    return () => {
      clearInterval(interval);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isLoading, testimonials.length, isHovered, animateToNext]);

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    gsap.to(cardRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setCurrentIndex(index),
    });
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-500 text-sm">Loading testimonials...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-sm">{error}</div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-section="testimonials"
      className="min-h-screen flex flex-col items-center justify-center py-24 px-6 lg:px-12 border-t border-neutral-800"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquareQuote className="w-4 h-4 text-neutral-600" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-600">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight">
            What People Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div
          ref={cardRef}
          className="min-h-[250px] cursor-pointer"
          onClick={animateToNext}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {testimonials[currentIndex] && (
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          )}
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-neutral-700 hover:bg-neutral-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="mt-4">
          <span className="text-xs text-neutral-600 font-mono">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
