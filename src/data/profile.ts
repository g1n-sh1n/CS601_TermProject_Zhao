import type { NavItem } from "../types.ts";

// Basic info used across the site (header, footer, home, contact)
export const profile = {
  name: "Jing Zhao",
  nickname: "Gin",
  role: "Front-end Software Engineer",
  email: "peonie@163.com",
  github: "g1n-sh1n",
  githubUrl: "https://github.com/g1n-sh1n",
  location: "San Francisco Bay Area, CA",
  tagline:
    "10 years of front-end. Still learning. Turning small ideas into technology that makes life a little more convenient.",
  intro:
    "I am a software engineer at Zoom working on online billing, and an MS in Software Development student at Boston University Metropolitan College."
};

export const navItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/resume", label: "Resume" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contact", label: "Contact" }
];
