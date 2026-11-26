/// <reference types="vite/client" />

// Typed environment variables (from .env.local locally, or GitHub repo variables in CI)
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
