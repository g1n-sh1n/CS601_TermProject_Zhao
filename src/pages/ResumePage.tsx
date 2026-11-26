import SectionTitle from "../components/SectionTitle.tsx";
import { profile } from "../data/profile.ts";
import { certifications, education, jobs } from "../data/resume.ts";

function ResumePage() {
  return (
    <article className="resume">
      <header className="resume-header">
        <SectionTitle level={1}>Resume</SectionTitle>
        <p className="resume-contact">
          {profile.name} · {profile.role} · <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p className="resume-education">
          <strong>Education:</strong> {education.degree}, {education.school} ({education.status})
        </p>
        <button type="button" className="button button-secondary no-print" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </header>

      <section aria-labelledby="exp-title">
        <h2 id="exp-title">Work Experience</h2>
        {jobs.map((job) => (
          <div key={job.company} className="resume-item">
            <div className="resume-item-head">
              <h3>{job.title}, {job.company}</h3>
              <p className="resume-dates">
                <time>{job.start}</time> &ndash; <time>{job.end}</time>
              </p>
            </div>
            <p className="resume-team">{job.team}</p>
            <ul>
              {job.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section aria-labelledby="cert-title">
        <h2 id="cert-title">Certifications</h2>
        <ul>
          {certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default ResumePage;
