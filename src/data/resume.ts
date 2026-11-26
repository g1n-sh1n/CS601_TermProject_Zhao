import type { Education, Job } from "../types.ts";

// One line at the top of the resume
export const education: Education = {
  school: "Boston University Metropolitan College",
  degree: "M.S. in Software Development",
  status: "In progress"
};

export const jobs: Job[] = [
  {
    company: "Zoom Video Communications, Inc.",
    team: "Billing · Online",
    title: "Software Engineer",
    start: "2021",
    end: "Present",
    highlights: [
      "Own the front end for online purchases, payments, order management, and billing information.",
      "Integrate with third-party payment services such as Stripe, and support billing features for other product teams.",
      "Help migrate legacy code into new projects to improve development speed and user experience.",
      "Build with accessibility (a11y) and internationalization (i18n) in mind."
    ]
  },
  {
    company: "iFLYTEK Co., Ltd.",
    team: "Consumer BG · Open Platform R&D",
    title: "Software Engineer",
    start: "2017",
    end: "2021",
    highlights: [
      "Front-end lead for AI College, an online AI learning platform: video courses, course purchase, and live classroom.",
      "Designed the build strategy for a multi-page portal and cut first-screen render time by more than 50%.",
      "Built a mobile web app on a React + Redux single-page scaffold that adapts to multiple devices.",
      "Built the iFLYTEK Open Platform with Next.js pre-rendering, canvas-based AI demos, and a Vue + ECharts control center."
    ]
  }
];

export const certifications: string[] = [
  "PMP (Project Management Professional)",
  "Shanghai Intermediate Interpretation Certificate (written test)",
  "CET-4 / CET-6 (College English Test)"
];
