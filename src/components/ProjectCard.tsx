import type { Project } from "../types.ts";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card" data-category={project.category} data-status={project.status}>
      <p className="project-type">{project.type}</p>
      <h3>{project.title}</h3>
      <p className="project-desc">{project.description}</p>
      <ul className="tags" aria-label="Technologies">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {project.links.length > 0 && (
        <div className="card-links">
          {project.links.map((link) => (
            <a key={link.url} className="project-link" href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export default ProjectCard;
