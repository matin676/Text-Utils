/**
 * Toast - Animated toast notification component
 *
 * WHY: Replaces the basic Alert component with a modern,
 * animated notification system with progress bar.
 */
import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import "./Toast.css";

// Icon components for different toast types
const icons = {
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z"
        fill="currentColor"
      />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"
        fill="currentColor"
      />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M1 18h18L10 1 1 18zm10-3H9v-2h2v2zm0-4H9V7h2v4z"
        fill="currentColor"
      />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9V9h2v6zm0-8H9V5h2v2z"
        fill="currentColor"
      />
    </svg>
  ),
};

function ToastItem({ toast, onRemove, duration }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 150);
  };

  return (
    <div
      className={`toast toast--${toast.type} ${isExiting ? "toast--exit" : ""}`}
      role="alert"
      aria-live="polite"
    >
      <div className="toast__icon">{icons[toast.type]}</div>
      <p className="toast__message">{toast.message}</p>
      <button
        className="toast__close"
        onClick={handleRemove}
        aria-label="Dismiss notification"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className="toast__progress"
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast, duration } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
          duration={duration}
        />
      ))}
    </div>
  );
}
