/**
 * App.jsx - Root Application Component
 *
 * ARCHITECTURE NOTES:
 * - Wraps the app with Context Providers (Theme, Toast)
 * - No direct DOM manipulation
 * - No prop drilling - children access state via useContext hooks
 * - Clean, declarative component composition
 */
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { Header } from "./components/layout/Header";
import { TextEditor } from "./components/features/TextEditor/TextEditor";
import { ToastContainer } from "./components/common/Toast";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        {/* 
          Toast container is rendered at root level for proper z-index stacking.
          It reads from ToastContext and renders any active notifications.
        */}
        <ToastContainer />

        {/* 
          Header includes the theme toggle. It uses useTheme() internally
          so no props need to be passed down.
        */}
        <Header />

        {/* 
          Main content area. TextEditor uses useTextUtils hook for logic
          and useToast hook for notifications - completely self-contained.
        */}
        <TextEditor />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
