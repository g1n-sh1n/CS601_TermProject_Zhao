import SectionTitle from "../components/SectionTitle.tsx";

// TODO: rewrite the bio and interests in your own words.
const interests = [
  { title: "Road trips", text: "Exploring the West Coast by car: Portland, Las Vegas, New Mexico, and Highway 395." },
  { title: "Cats", text: "Two cats who supervise every line of code I write." },
  { title: "Soccer", text: "Following the World Cup and digging into football history and stats." },
  { title: "Cooking", text: "Trying new recipes, and sometimes planning meals with a constraint solver." },
  { title: "Reading", text: "Contemporary Chinese-language fiction and literature." },
  { title: "Digital art", text: "Drawing and playing with visual ideas outside of work." }
];

function AboutPage() {
  return (
    <div className="two-column">
      <section aria-labelledby="bio-title">
        <SectionTitle id="bio-title" level={1}>About Me</SectionTitle>
        <p>
          I have been building for the web for about ten years. I started at iFLYTEK, where I
          led the front end of an online AI learning platform, and I now work on online billing
          at Zoom in the Bay Area.
        </p>
        <p>
          I am also studying for an MS in Software Development at Boston University
          Metropolitan College, which lets me go deeper into algorithms, design patterns, AI, and
          software process.
        </p>
        <p>
          I enjoy turning messy problems into simple, well-structured code, and I care a lot
          about accessibility and the small details that make a product pleasant to use.
        </p>
      </section>

      <section aria-labelledby="interests-title">
        <SectionTitle id="interests-title">Interests</SectionTitle>
        <ul className="interest-list">
          {interests.map((item) => (
            <li key={item.title} className="interest-item">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AboutPage;
