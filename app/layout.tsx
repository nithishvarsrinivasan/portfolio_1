import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nithishvar S — Software Engineer / Business Analyst / AI Developer",
  description:
    "Portfolio of Nithishvar S — AI/ML, data analytics, and software engineering projects including RAG pipelines, agentic AI, and graph-based recommenders.",
  openGraph: {
    title: "Nithishvar S — Portfolio",
    description:
      "AI/ML, data analytics, and software engineering projects — RAG pipelines, agentic AI, graph recommenders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
