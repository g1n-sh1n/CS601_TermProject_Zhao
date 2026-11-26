import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ResumePage from "./pages/ResumePage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import SkillsPage from "./pages/SkillsPage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

// Routes (7 content pages + a 404 page):
//   /          -> Home
//   /about     -> About me (bio + interests)
//   /resume    -> Resume
//   /projects  -> Projects (local data + live GitHub repos)
//   /skills    -> Skills (canvas chart + drag-and-drop ranking)
//   /gallery   -> Photo gallery
//   /contact   -> Contact form + "Your messages" (CRUD through our Node API + Postgres)
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
