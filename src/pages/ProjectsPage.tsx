import { useState } from "react";
import ProjectCard from "../components/ProjectCard.tsx";
import SectionTitle from "../components/SectionTitle.tsx";
import GitHubRepos from "../components/GitHubRepos.tsx";
import { projects } from "../data/projects.ts";
import type { ProjectCategory } from "../types.ts";

type Filter = "all" | ProjectCategory;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "ai", label: "AI" },
  { value: "design", label: "Design" },
  { value: "algorithms", label: "Algorithms" },
  { value: "work", label: "Work" }
];

function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section aria-labelledby="projects-title">
        <SectionTitle id="projects-title" level={1}>Projects</SectionTitle>

        <div className="filter-bar" role="group" aria-label="Filter projects by category">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              className="filter-button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* aria-live tells screen readers when the number of results changes */}
        <p className="result-count" aria-live="polite">
          Showing {shown.length} of {projects.length} projects
        </p>

        <div className="project-grid">
          {shown.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <GitHubRepos />
    </>
  );
}

export default ProjectsPage;
