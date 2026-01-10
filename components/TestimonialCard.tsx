"use client";

import { Testimonial } from "@/types";
import { Linkedin, Quote } from "lucide-react";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="testimonial-card flex flex-col lg:flex-row gap-12 lg:gap-16 w-full">
      {/* Left - Author Info */}
      <div className="flex flex-col items-center lg:items-start lg:w-64 flex-shrink-0">
        {/* Company Logo */}
        {testimonial.companyLogo && (
          <div className="w-16 h-16 rounded-2xl bg-white p-3 mb-6">
            <img
              src={testimonial.companyLogo}
              alt={testimonial.company}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Author Details */}
        <h4 className="text-lg font-semibold text-white mb-1">
          {testimonial.name}
        </h4>
        <p className="text-sm text-neutral-400 mb-1">{testimonial.role}</p>
        <p className="text-sm text-neutral-500 mb-3">{testimonial.company}</p>

        {testimonial.experience && (
          <p className="text-xs text-neutral-600 mb-4">
            {testimonial.experience}
          </p>
        )}

        {testimonial.linkedin && (
          <a
            href={testimonial.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        )}
      </div>

      {/* Right - Testimonial */}
      <div className="flex-1">
        <Quote className="w-10 h-10 text-neutral-800 mb-6" />
        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light">
          {testimonial.testimonial}
        </p>
      </div>
    </div>
  );
}
