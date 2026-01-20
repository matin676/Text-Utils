/**
 * Header - Modern header with theme toggle
 *
 * WHY: Replaces the Bootstrap-dependent Navbar with a custom,
 * accessible header. Uses CSS variables for theming.
 */
import { useTheme } from "../../context/ThemeContext";
import "./Header.css";

// Animated sun/moon icons for theme toggle
function ThemeIcon({ isDark }) {
  return (
    <div className="theme-icon">
      <svg
        className={`theme-icon__sun ${isDark ? "hidden" : ""}`}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
      <svg
        className={`theme-icon__moon ${!isDark ? "hidden" : ""}`}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </div>
  );
}

export function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo">
          <span className="header__logo-icon">✨</span>
          <span className="header__logo-text">TextUtils</span>
        </a>

        <nav className="header__nav">
          <button
            className="header__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            <ThemeIcon isDark={isDark} />
          </button>
        </nav>
      </div>
    </header>
  );
}
