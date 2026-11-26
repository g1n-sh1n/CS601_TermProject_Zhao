import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navItems, profile } from "../data/profile.ts";

// Site header with logo and main navigation.
// On small screens the nav collapses behind a "Menu" button.
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="logo" aria-hidden="true">JZ</span>
        <span className="brand-text">
          <span className="brand-name">{profile.name}</span>
          <span className="brand-role">{profile.role}</span>
        </span>
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Menu
      </button>

      <nav id="main-nav" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              {/* NavLink adds class "active" and aria-current="page" on the current page */}
              <NavLink to={item.path} end={item.path === "/"} onClick={() => setMenuOpen(false)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
