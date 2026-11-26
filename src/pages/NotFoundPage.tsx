import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle.tsx";

function NotFoundPage() {
  return (
    <section>
      <SectionTitle level={1}>Page not found</SectionTitle>
      <p>Sorry, that page does not exist.</p>
      <p><Link to="/">Back to the home page</Link></p>
    </section>
  );
}

export default NotFoundPage;
