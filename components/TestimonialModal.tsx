interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  linkedin: string;
  experience: string;
}

export default function TestimonialModal({
  isOpen,
  onClose,
  name,
  role,
  company,
  testimonial,
  linkedin,
  experience,
}: TestimonialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-neutral-50 dark:bg-neutral-900 backdrop-blur-sm rounded-xl border border-neutral-200 dark:border-neutral-800">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 smooth-transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-2">{name}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 font-light">
              {role} at {company}
            </p>
          </div>

          {/* Testimonial */}
          <div className="mb-8">
            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed italic font-light">
              "{testimonial}"
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 smooth-transition font-light"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              View LinkedIn Profile
            </a>
            <button
              onClick={() => {
                onClose();
                const experienceSection = document.getElementById("experience");
                if (experienceSection) {
                  const offset = 80;
                  const elementPosition = experienceSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className="inline-flex items-center text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 smooth-transition font-light"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              View Experience Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
