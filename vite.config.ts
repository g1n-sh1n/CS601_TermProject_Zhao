import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes every asset path relative, so the build works on
// GitHub Pages no matter what the repo is called (/<repo-name>/).
export default defineConfig({
  plugins: [react()],
  base: "./"
});
