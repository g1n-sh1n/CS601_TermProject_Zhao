import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { navItems } from "../data/profile.ts";

// Shared layout: header and footer stay, the page in the middle changes.
function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // On every route change: scroll to top, update the tab title,
  // and move keyboard focus to <main> so screen readers announce the new page.
  useEffect(() => {
    window.scrollTo(0, 0);

    const current = navItems.find((item) => item.path === pathname);
    document.title = current && current.path !== "/" ? `${current.label} | Jing Zhao` : "Jing Zhao | Portfolio";

    mainRef.current?.focus();
  }, [pathname]);

  return (
    <div className="page">
      <a className="skip-link" href="#main-content" onClick={(e) => {
        // HashRouter uses the hash for routes, so handle the skip link with the DOM instead
        e.preventDefault();
        mainRef.current?.focus();
      }}>
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="content" tabIndex={-1} ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
