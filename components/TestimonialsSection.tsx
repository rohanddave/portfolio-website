"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Testimonial, TestimonialsData } from "../types";
import testimonialsData from "@/public/data/testimonials.json";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/data/testimonials.json");
        const data: TestimonialsData = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 animate-pulse"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-700 rounded" />
                <div className="h-3 w-24 bg-gray-700 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded" />
              <div className="h-4 bg-gray-700 rounded" />
              <div className="h-4 w-3/4 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {testimonialsData.testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          name={testimonial.name}
          role={testimonial.role}
          company={testimonial.company}
          testimonial={testimonial.testimonial}
          linkedin={testimonial.linkedin}
          experience={testimonial.experience}
        />
      ))}
    </div>
  );
}
