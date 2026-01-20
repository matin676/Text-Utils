/**
 * useLocalStorage - Hook for persisting state to localStorage
 *
 * WHY: Provides a drop-in replacement for useState that automatically
 * syncs with localStorage. Handles JSON serialization and errors.
 */
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // Initialize state from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync to localStorage whenever the value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
