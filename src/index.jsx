/**
 * main.jsx - Application Entry Point
 *
 * Minimal entry point that:
 * 1. Imports global styles in the correct order
 * 2. Renders the App component
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Global styles - order matters!
import "./styles/variables.css"; // CSS custom properties (must be first)
import "./styles/base.css"; // Reset and typography
import "./styles/animations.css"; // Keyframes and utilities

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
