"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, FolderKanban } from "lucide-react";
import "./Timeline.css";

gsap.registerPlugin(ScrollTrigger);

type TimeLineItemType = "education" | "work" | "project";

type TimeLineDataItem = {
  type: TimeLineItemType;
  title: string;
  organization: string;
  date: string;
  description: string;
};

type ColorConfig = {
  bg: string;
  border: string;
  text: string;
};

const timelineData: TimeLineDataItem[] = [
  {
    type: "education",
    title: "Computer Science Degree",
    organization: "MIT",
    date: "2016 - 2020",
    description:
      "Bachelor of Science in Computer Science with focus on AI and distributed systems.",
  },
  {
    type: "work",
    title: "Junior Developer",
    organization: "StartupXYZ",
    date: "2020 - 2021",
    description:
      "Built React applications and REST APIs. Collaborated with design team on UI/UX.",
  },
  {
    type: "project",
    title: "E-commerce Platform",
    organization: "Personal Project",
    date: "2021",
    description:
      "Full-stack e-commerce app with Next.js, Stripe integration, and PostgreSQL.",
  },
  {
    type: "work",
    title: "Senior Frontend Engineer",
    organization: "TechCorp Inc.",
    date: "2021 - 2023",
    description:
      "Leading frontend architecture decisions. Mentoring junior developers.",
  },
  {
    type: "project",
    title: "Open Source CLI Tool",
    organization: "GitHub",
    date: "2023",
    description:
      "Developer tool with 2k+ stars. Built with Node.js and published to npm.",
  },
];

const iconMap: Record<
  TimeLineItemType,
  typeof GraduationCap | typeof Briefcase | typeof FolderKanban
> = {
  education: GraduationCap,
  work: Briefcase,
  project: FolderKanban,
};

const colorMap: Record<TimeLineItemType, ColorConfig> = {
  education: {
    bg: "bg-blue-500",
    border: "border-blue-500",
    text: "text-blue-500",
  },
  work: {
    bg: "bg-emerald-500",
    border: "border-emerald-500",
    text: "text-emerald-500",
  },
  project: {
    bg: "bg-purple-500",
    border: "border-purple-500",
    text: "text-purple-500",
  },
};

function TimelineItem({ item }: { item: TimeLineDataItem }) {
  const Icon = iconMap[item.type];
  const colors = colorMap[item.type];

  return (
    <div className="project-wrap">
      <div
        className={`timeline-card bg-white rounded-xl p-6 shadow-lg border-t-4 ${colors.border} h-full`}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className={`${colors.bg} p-2 rounded-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </span>
          <span
            className={`text-sm font-semibold ${colors.text} uppercase tracking-wide`}
          >
            {item.type}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-2">{item.date}</p>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
        <p className="text-sm font-medium text-gray-600 mb-3">
          {item.organization}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;

    if (!section || !strip) return;

    // Calculate dimensions
    let stripWidth = strip.scrollWidth;
    let scrollLength = stripWidth - window.innerWidth;

    const refresh = () => {
      stripWidth = strip.scrollWidth;
      scrollLength = stripWidth - window.innerWidth;
    };

    const ctx = gsap.context(() => {
      // Horizontal scroll with pinning
      const scrollTween = gsap.to(strip, {
        x: () => -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${stripWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Animate items as they come into view
      gsap.utils.toArray<HTMLElement>(".project-wrap").forEach((item) => {
        gsap.fromTo(
          item.querySelector(".timeline-card"),
          { opacity: 0.5, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: item,
              containerAnimation: scrollTween,
              start: "left 85%",
              end: "left 50%",
              scrub: 1,
            },
          }
        );
      });
    }, section);

    // Handle resize
    ScrollTrigger.addEventListener("refreshInit", refresh);

    return () => {
      ctx.revert();
      ScrollTrigger.removeEventListener("refreshInit", refresh);
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {/* Hero Section */}
        <section className="panel plain">
          <div className="panel-content">
            <h1>My Journey</h1>
            <p>Scroll down to explore my timeline</p>
            <div className="scroll-indicator">
              <span>↓</span>
            </div>
          </div>
        </section>

        {/* Horizontal Timeline Gallery */}
        <section id="portfolio" ref={sectionRef}>
          <div className="container-fluid">
            {/* Timeline line */}
            <div className="timeline-line" />

            <div className="horiz-gallery-wrapper">
              <div className="horiz-gallery-strip" ref={stripRef}>
                {timelineData.map((item, index) => (
                  <TimelineItem key={index} item={item} />
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="timeline-legend">
              {(
                Object.entries(colorMap) as [TimeLineItemType, ColorConfig][]
              ).map(([type, colors]) => (
                <div key={type} className="legend-item">
                  <div className={`legend-dot ${colors.bg}`} />
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* End Section */}
        <section className="panel plain">
          <div className="panel-content">
            <h2>Let&apos;s Connect</h2>
            <p>Thanks for scrolling through my journey!</p>
          </div>
        </section>
      </div>
    </div>
  );
}
