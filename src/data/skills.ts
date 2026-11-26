import type { Skill } from "../types.ts";

// level: 1 (learning) to 5 (expert). Used by the canvas bar chart.
// TODO: adjust the levels so they match how you see yourself.
export const skills: Skill[] = [
  { name: "JavaScript", level: 5, group: "Languages" },
  { name: "TypeScript", level: 4, group: "Languages" },
  { name: "HTML & CSS", level: 5, group: "Languages" },
  { name: "Java", level: 3, group: "Languages" },
  { name: "Python", level: 2, group: "Languages" },
  { name: "React", level: 5, group: "Frameworks" },
  { name: "Vue", level: 5, group: "Frameworks" },
  { name: "Node.js", level: 3, group: "Frameworks" },
  { name: "Next.js", level: 3, group: "Frameworks" },
  { name: "Webpack / Vite", level: 4, group: "Tools" },
  { name: "Git", level: 4, group: "Tools" },
  { name: "Accessibility (a11y)", level: 4, group: "Practices" },
  { name: "Agile / Scrum", level: 4, group: "Practices" }
];
