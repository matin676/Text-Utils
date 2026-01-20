/**
 * ToastContext - Manages toast notifications with queue system
 *
 * WHY: Replaces the basic alert system with a proper notification queue.
 * Supports multiple toast types, auto-dismiss with progress, and stacking.
 */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

const ToastContext = createContext(undefined);

const TOAST_DURATION = 3000; // 3 seconds

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const addToast = useCallback((message, type = "success") => {
    const id = ++toastIdRef.current;

    const toast = {
      id,
      message,
      type, // 'success' | 'error' | 'warning' | 'info'
      createdAt: Date.now(),
    };

    setToasts((prev) => [...prev, toast]);

    // Auto-dismiss after duration - use setToasts directly to avoid stale closure
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Convenience methods
  const success = useCallback(
    (message) => addToast(message, "success"),
    [addToast],
  );
  const error = useCallback(
    (message) => addToast(message, "error"),
    [addToast],
  );
  const warning = useCallback(
    (message) => addToast(message, "warning"),
    [addToast],
  );
  const info = useCallback((message) => addToast(message, "info"), [addToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
        duration: TOAST_DURATION,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
