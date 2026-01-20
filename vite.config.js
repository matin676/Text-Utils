import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Text-Utils/", // Set base url for GitHub Pages deployment
  build: {
    outDir: "build", // Maintain 'build' as output directory to match existing deployment scripts if desired, or change 'deploy' script later. Default is 'dist'.
  },
  server: {
    open: true, // Auto open browser on start
  },
});
