"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Set initial position off-screen
    gsap.set([cursor, cursorDot], { xPercent: -50, yPercent: -50 });

    // Track mouse position
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    // Smooth follow speed (lower = smoother)
    const speed = 0.15;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const xSetDot = gsap.quickSetter(cursorDot, "x", "px");
    const ySetDot = gsap.quickSetter(cursorDot, "y", "px");

    // Update mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Animation loop
    const ticker = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;

      xSet(pos.x);
      ySet(pos.y);
      xSetDot(mouse.x);
      ySetDot(mouse.y);
    };

    // Hover effects for interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 2,
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorDot, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Text hover effect
    const handleTextEnter = () => {
      gsap.to(cursor, {
        scale: 3,
        opacity: 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleTextLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Hide cursor when leaving window
    const handleMouseLeaveWindow = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.3,
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.3,
      });
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    gsap.ticker.add(ticker);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor='pointer']"
    );
    const textElements = document.querySelectorAll(
      "h1, h2, h3, p, [data-cursor='text']"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    textElements.forEach((el) => {
      el.addEventListener("mouseenter", handleTextEnter);
      el.addEventListener("mouseleave", handleTextLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      gsap.ticker.remove(ticker);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleTextEnter);
        el.removeEventListener("mouseleave", handleTextLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
      />
      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
      />
    </>
  );
}
