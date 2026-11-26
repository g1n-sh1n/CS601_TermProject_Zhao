import type { Project } from "../types.ts";

// Projects carried over from HW3, plus work projects from the resume
export const projects: Project[] = [
  {
    id: "wordle",
    title: "Wordle Clone",
    type: "Personal project",
    category: "web",
    status: "complete",
    description:
      "A browser version of the five-letter word-guessing game, built as a Vue single-page app and deployed on Vercel.",
    tags: ["Vue.js", "JavaScript", "Vercel"],
    links: [
      { label: "Play demo", url: "https://wordle-gin.vercel.app/" },
      { label: "Code", url: "https://github.com/g1n-sh1n/wordle" }
    ]
  },
  {
    id: "look2next",
    title: "Look2Next",
    type: "Personal project",
    category: "ai",
    status: "complete",
    description:
      "A gaze-based interaction demo: look at the bottom-right corner of the screen and the page turns. Uses the webcam with a cooldown to avoid accidental flips.",
    tags: ["Vue 3", "Vite", "WebGazer.js"],
    links: [{ label: "View on GitHub", url: "https://github.com/g1n-sh1n/look2next" }]
  },
  {
    id: "meal-planner",
    title: "Weekly Meal Planner (CSP)",
    type: "CS664 · Artificial Intelligence",
    category: "ai",
    status: "complete",
    description:
      "Models a week of meals as a constraint satisfaction problem and compares plain backtracking, backtracking with forward checking and MRV, and Google OR-Tools.",
    tags: ["Python", "CSP", "OR-Tools"],
    links: []
  },
  {
    id: "design-patterns",
    title: "Design Patterns & UML",
    type: "CS665 · Software Design & Patterns",
    category: "design",
    status: "complete",
    description:
      "Object-oriented designs applying classic design patterns, documented with class, activity, and state diagrams in PlantUML.",
    tags: ["Java", "UML", "PlantUML"],
    links: []
  },
  {
    id: "algo-labs",
    title: "Algo Labs",
    type: "CS526 · Data Structures & Algorithms",
    category: "algorithms",
    status: "complete",
    description:
      "Lab assignments built around startup scenarios covering trees, hash tables, sorting, graph algorithms, and dynamic programming.",
    tags: ["Java", "Python", "Algorithms"],
    links: []
  },
  {
    id: "zoom-billing",
    title: "Zoom Billing Service",
    type: "Work · Zoom",
    category: "work",
    status: "complete",
    description:
      "Front end for online purchases, payments, order management, and billing information, with Stripe integration and cross-team billing support.",
    tags: ["Vue CLI", "Stripe", "a11y", "i18n"],
    links: []
  },
  {
    id: "ai-college",
    title: "AI College",
    type: "Work · iFLYTEK",
    category: "work",
    status: "complete",
    description:
      "An online AI learning platform with video courses, course purchase, and live classes. Led the front end and cut first-screen render time by over 50%.",
    tags: ["React", "Redux", "Hooks", "Webpack"],
    links: []
  },
  {
    id: "this-site",
    title: "This Portfolio",
    type: "CS601 · Web Application Development",
    category: "web",
    status: "in-progress",
    description:
      "The site you are looking at: a multi-page React + TypeScript app with routing, a canvas chart, drag and drop, and live data from the GitHub API.",
    tags: ["React", "TypeScript", "Vite"],
    links: [{ label: "Code", url: "https://github.com/g1n-sh1n/CS601_TermProject_Zhao" }]
  }
];
