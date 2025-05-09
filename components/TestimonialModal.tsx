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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
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
            <h3 className="text-2xl font-semibold text-white mb-2">{name}</h3>
            <p className="text-gray-400">
              {role} at {company}
            </p>
          </div>

          {/* Testimonial */}
          <div className="mb-8">
            <p className="text-gray-300 text-lg leading-relaxed italic">
              "{testimonial}"
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
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
            <a
              href={`/experience/${experience}`}
              className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              View Experience
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
