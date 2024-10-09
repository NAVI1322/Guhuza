import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Live Interviews",
    description: "Find the perfect match and interview live directly through our platform.",
    link: "https://microsoft.com"
  },
  {
    title: "Skills Testing",
    description: "Take the guesswork out of training and hiring. Choose from 500 standard job-based and subject-based tests.",
    link: "https://microsoft.com"
  },
  {
    title: "Background Checks",
    description: "Reduce your time to hire by 80% and get results in minutes.",
    link: "https://microsoft.com"
  },
  {
    title: "Job Matching Algorithm",
    description: "Utilize our AI-driven algorithm to match candidates with jobs more efficiently.",
    link: "https://microsoft.com"
  },
  {
    title: "Virtual Onboarding",
    description: "Streamline the onboarding process with our virtual onboarding tool.",
    link: "https://microsoft.com"
  },
  {
    title: "Performance Tracking",
    description: "Monitor employee performance with our comprehensive tracking system.",
    link: "https://microsoft.com"
    },
];
