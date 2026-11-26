import SectionTitle from "../components/SectionTitle.tsx";
import SkillChart from "../components/SkillChart.tsx";
import SkillRanker from "../components/SkillRanker.tsx";
import { skills } from "../data/skills.ts";
import type { Skill } from "../types.ts";

const groups: Skill["group"][] = ["Languages", "Frameworks", "Tools", "Practices"];

// What I learned in CS601 (rubric: "showcase skills you learned in this course")
const cs601Topics = [
  "Semantic HTML5 and validation",
  "CSS3: Flexbox, Grid, selectors, responsive design",
  "JavaScript and the DOM",
  "TypeScript",
  "React components, props, state, and routing",
  "HTML5 APIs: Canvas, Drag and Drop",
  "Fetching data from external APIs",
  "A Node.js + Express API with a Postgres database",
  "Web accessibility"
];

function SkillsPage() {
  return (
    <>
      <SectionTitle level={1}>Skills</SectionTitle>

      <div className="two-column">
        <section aria-labelledby="skill-groups-title">
          <h2 id="skill-groups-title" className="subheading">By category</h2>
          {groups.map((group) => (
            <div key={group} className="skill-group">
              <h3>{group}</h3>
              <ul className="skill-list">
                {skills
                  .filter((s) => s.group === group)
                  .map((s) => (
                    <li key={s.name}>{s.name}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section aria-labelledby="chart-title">
          <h2 id="chart-title" className="subheading">Comfort level</h2>
          <SkillChart skills={skills} />
        </section>
      </div>

      <div className="two-column">
        <section aria-labelledby="cs601-title">
          <SectionTitle id="cs601-title">What I learned in CS601</SectionTitle>
          <ul className="check-list">
            {cs601Topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="rank-title">
          <SectionTitle id="rank-title">Your turn: rank them</SectionTitle>
          <p className="muted">Drag the items (or use the arrows) to put them in the order you find most useful.</p>
          <SkillRanker initial={["React", "TypeScript", "CSS Grid", "Canvas", "Accessibility"]} />
        </section>
      </div>
    </>
  );
}

export default SkillsPage;
