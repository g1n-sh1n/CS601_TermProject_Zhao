# CS601 Term Project – Portfolio

Author: Jing Zhao · BU MET CS601 Web Application Development

## Goal

A multi-page personal portfolio that shows who I am, my resume, my projects, and the skills
I learned in CS601. The front end is built with **React + TypeScript** (Vite), uses no CSS framework,
and is deployed on **GitHub Pages**. A small **Node.js + Express API** with a
**Postgres** database (in `server/`) powers the contact form.

Live site: https://g1n-sh1n.github.io/CS601_TermProject_Zhao/  
Code: https://github.com/g1n-sh1n/CS601_TermProject_Zhao

## Pages (7)

| Route | Page | What it shows |
|---|---|---|
| `/` | Home | Intro and featured projects |
| `/about` | About | Bio and interests |
| `/resume` | Resume | Experience, education (MS in progress), certifications; print to PDF |
| `/projects` | Projects | Filterable project cards + live repos from the GitHub API |
| `/skills` | Skills | Skills by category, canvas chart, drag-and-drop ranking, CS601 topics |
| `/gallery` | Gallery | Thumbnails with a `<dialog>` lightbox |
| `/contact` | Contact | Validated contact form saved to the database; visitors can view, edit, and withdraw their own messages |

## How to run locally

You need Node.js 20.6+ and a Postgres database (a free [Neon](https://neon.tech) database works).

**1. API (terminal 1)**

```bash
cd server
npm install
cp .env.example .env     # then paste your DATABASE_URL into .env
npm run dev              # http://localhost:3001  (tables are created automatically)
```

**2. Front end (terminal 2)**

```bash
npm install
cp .env.example .env.local   # VITE_API_URL=http://localhost:3001
npm run dev                  # http://localhost:5173
```

Other scripts: `npm run build` (type-check + production build), `npm run preview`.

## API

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/messages` | Create a message; returns a secret edit token |
| GET | `/api/messages/:id` | Read your message (needs `X-Edit-Token`) |
| PUT | `/api/messages/:id` | Update your message (needs `X-Edit-Token`) |
| DELETE | `/api/messages/:id` | Delete (withdraw) your message (needs `X-Edit-Token`) |

There are no accounts: the browser keeps each message's edit token in `localStorage`, and the
database stores only a SHA-256 hash of it. Input is validated on the server, writes are
rate-limited, and CORS only allows the site's own origins.

## Deployment

1. **Database**: create a free Postgres database on Neon and copy its connection string.
2. **API**: on Render, choose New -> Blueprint and pick this repo (`render.yaml`), then set
   `DATABASE_URL` in the service's environment. Note the API URL, e.g. `https://cs601-portfolio-api.onrender.com`.
3. **Front end**: in GitHub, set Settings -> Secrets and variables -> Actions -> Variables ->
   `VITE_API_URL` to the API URL, and set Settings -> Pages -> Source to "GitHub Actions".
   Every push to `main` builds and deploys the site.

The free Render plan sleeps after 15 minutes without traffic, so the first request can take
up to a minute; the contact form tells visitors when this happens.

## Project structure

```
term-project/
├── .github/workflows/deploy.yml   # GitHub Pages deployment
├── render.yaml                    # Render blueprint for the API
├── server/                        # Node.js + Express + Postgres API
│   └── src/ (index.ts, db.ts, validate.ts, routes/messages.ts)
├── index.html                     # entry HTML + <noscript> fallback
├── public/                        # static files (favicon, images)
│   └── images/gallery/
└── src/
    ├── main.tsx                   # React root + HashRouter
    ├── App.tsx                    # routes
    ├── types.ts                   # shared TypeScript types
    ├── api/                       # fetch wrapper for the Node API + edit-token storage
    ├── components/                # Layout, Header, Footer, ProjectCard, SkillChart, ContactFields, MyMessages, ...
    ├── utils/                     # contact form validation
    ├── pages/                     # one file per page
    ├── data/                      # site content (profile, resume, projects, skills, gallery)
    └── styles/global.css          # all styles (Flexbox + Grid, responsive)
```

## Rubric checklist

- **HTML**: semantic elements (`header`, `nav`, `main`, `article`, `section`, `aside`, `figure`, `dialog`, `time`)
- **CSS**: custom properties, Flexbox, Grid, attribute selectors, pseudo-classes/elements, media queries, print styles
- **JavaScript / TypeScript**: typed data and components, form validation, event handling
- **React**: function components, props, `useState`, `useEffect`, `useRef`, React Router (nested routes, `NavLink`)
- **DOM**: canvas drawing, focus management on route change, `<dialog>` `showModal()`, drag-and-drop events, `document.title`
- **Accessibility**: skip link, labelled landmarks, `aria-current`, `aria-live`, `aria-invalid`, keyboard alternatives for drag and drop, alt/width/height on all images, `<noscript>` fallback
- **Responsive**: liquid layout with Grid/Flexbox and media queries, collapsible mobile menu

### Extra credit

- [x] HTML5 APIs: Canvas (skill chart), Drag and Drop (skill ranking)
- [x] TypeScript in React instead of JavaScript
- [x] External API: GitHub REST API on the Projects page
- [x] Server-side language + database: Node.js/Express API with Postgres, full CRUD from the contact form (send, view, edit, withdraw)
- [x] Responsive layout with Flexbox and Grid only (no frameworks)

## Validation

- HTML: https://validator.w3.org (check the deployed URL)
- CSS: https://jigsaw.w3.org/css-validator/
- Accessibility: https://wave.webaim.org
