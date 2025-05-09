import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rohan Dave | AI & Full-Stack Software Engineer",
  description:
    "AI and full-stack software engineer specializing in LLMs, RAG systems, and agentic AI development. Building intelligent applications with modern technologies like Next.js, React, and MCP servers.",
  keywords: [
    "AI Engineer",
    "LLM Development",
    "RAG Systems",
    "Agentic AI",
    "MCP Server",
    "Full-Stack Developer",
    "Web Development",
    "Cloud Architecture",
    "Next.js",
    "React",
    "NestJS",
    "TypeScript",
    "Portfolio",
    "Large Language Models",
    "AI Agents",
    "Retrieval Augmented Generation",
    "AI Integration",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
  ].join(", "),
  authors: [{ name: "Rohan Dave" }],
  openGraph: {
    title: "Rohan Dave | AI & Full-Stack Software Engineer",
    description:
      "AI and full-stack software engineer specializing in LLMs, RAG systems, and agentic AI development. Building intelligent applications with modern technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Dave | AI & Full-Stack Software Engineer",
    description:
      "AI and full-stack software engineer specializing in LLMs, RAG systems, and agentic AI development. Building intelligent applications with modern technologies.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
