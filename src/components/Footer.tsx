import { Link } from "react-router-dom";
import { profile } from "../data/profile.ts";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p className="copyright">&copy; {year} {profile.name}. All rights reserved.</p>
      <nav className="footer-nav" aria-label="Footer navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><a href={`mailto:${profile.email}`}>Email</a></li>
          <li><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </nav>
      <p className="footer-note">Built with React &amp; TypeScript for BU MET CS601</p>
    </footer>
  );
}

export default Footer;
