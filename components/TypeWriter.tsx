"use client";

import { useState, useEffect } from "react";

interface TypeWriterProps {
  text: string | string[];
  className?: string;
  loop?: boolean;
}

export default function TypeWriter({
  text,
  className = "",
  loop = false,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = Array.isArray(text) ? text : [text];

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting && currentIndex < currentText.length) {
          // Typing
          setDisplayText(currentText.slice(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
        } else if (isDeleting && currentIndex > 0) {
          // Deleting
          setDisplayText(currentText.slice(0, currentIndex - 1));
          setCurrentIndex((prev) => prev - 1);
        } else if (!isDeleting && currentIndex === currentText.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && currentIndex === 0) {
          // Move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      },
      isDeleting ? 30 : 50
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, currentTextIndex, isDeleting, texts]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
}
