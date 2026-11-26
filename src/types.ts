// Shared TypeScript types for the data files and components

export interface NavItem {
  path: string;
  label: string;
}

export interface Job {
  company: string;
  team: string;
  title: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  status: string;
}

export type ProjectCategory = "web" | "ai" | "design" | "algorithms" | "work";

export interface Project {
  id: string;
  title: string;
  type: string; // e.g. "Personal project" or "CS664 · Artificial Intelligence"
  category: ProjectCategory;
  status: "complete" | "in-progress";
  description: string;
  tags: string[];
  links: { label: string; url: string }[];
}

export interface Skill {
  name: string;
  level: number; // 1 - 5, used by the canvas chart
  group: "Languages" | "Frameworks" | "Tools" | "Practices";
}

export interface Photo {
  src: string;
  thumb: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

// One contact message as returned by our own API (server/)
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  topic: string;
  message: string;
  created_at: string;
  updated_at: string;
}

// What the visitor fills in on the contact form
export type ContactInput = Pick<ContactMessage, "name" | "email" | "topic" | "message">;

// Shape of one repo returned by the GitHub REST API (only the fields we use)
export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}
