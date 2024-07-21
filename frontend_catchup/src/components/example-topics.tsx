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
    title: "YCombinator",
    description: "Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Seqouia Capital",
    description: "A multinational technology company focusing on e-commerce.",
    link: "https://amazon.com",
  },
  {
    title: "Founders Fund",
    description: "Personal computers, and related services.",
    link: "https://microsoft.com",
  },
];
