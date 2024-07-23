import { HoverEffect } from "./card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-2">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "AI/ML",
    description: "Facebook's mission of bringing the world closer together.",
    link: "#",
  },
  {
    title: "Cancer",
    description: "A multinational technology company focusing on e-commerce.",
    link: "#",
  },
  {
    title: "Computer networks",
    description: "Personal computers, and related services.",
    link: "#",
  },
];
