import { Link } from "react-router-dom";
import { profile } from "../data/profile.ts";
import { projects } from "../data/projects.ts";
import ProjectCard from "../components/ProjectCard.tsx";
import SectionTitle from "../components/SectionTitle.tsx";

function HomePage() {
  // Show the first three projects as a preview
  const featured = projects.slice(0, 3);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Hi, I'm {profile.nickname}</p>
        <h1 id="hero-title">{profile.tagline}</h1>
        <p className="hero-lead">{profile.intro}</p>
        <div className="hero-actions">
          <Link className="button" to="/projects">See my projects</Link>
          <Link className="button button-secondary" to="/contact">Get in touch</Link>
        </div>
      </section>

      <section aria-labelledby="featured-title">
        <SectionTitle id="featured-title">Featured Projects</SectionTitle>
        <div className="project-grid">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <p className="more-link">
          <Link to="/projects">All projects</Link>
        </p>
      </section>
    </>
  );
}

export default HomePage;
