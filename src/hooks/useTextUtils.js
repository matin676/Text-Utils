/**
 * useTextUtils - Custom hook for text manipulation operations
 *
 * FEATURES:
 * - Text transformations (case, spaces, reverse)
 * - Find & Replace
 * - Encode/Decode (Base64, URL)
 * - Export as file
 * - Undo/Redo history
 * - Text statistics
 */
import { useState, useMemo, useCallback, useRef } from "react";

const MAX_HISTORY = 50;

export function useTextUtils(initialText = "") {
  const [text, setText] = useState(initialText);

  // History for undo/redo
  const [history, setHistory] = useState([initialText]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isUndoRedo = useRef(false);

  // Wrap setText to track history
  const updateText = useCallback(
    (newTextOrFn) => {
      setText((prev) => {
        const newText =
          typeof newTextOrFn === "function" ? newTextOrFn(prev) : newTextOrFn;

        // Don't add to history if this is an undo/redo operation
        if (!isUndoRedo.current && newText !== prev) {
          setHistory((h) => {
            // Slice history to current index and add new entry
            const newHistory = [...h.slice(0, historyIndex + 1), newText];
            // Limit history size
            return newHistory.slice(-MAX_HISTORY);
          });
          setHistoryIndex((i) => Math.min(i + 1, MAX_HISTORY - 1));
        }

        return newText;
      });
    },
    [historyIndex],
  );

  // Memoized text statistics
  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText
      ? trimmedText.split(/\s+/).filter((word) => word.length > 0)
      : [];

    const wordCount = words.length;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, "").length;
    const readingTimeMinutes = wordCount / 200;
    const readingTimeSeconds = Math.ceil(readingTimeMinutes * 60);
    const sentenceCount = trimmedText
      ? (trimmedText.match(/[.!?]+/g) || []).length
      : 0;
    const paragraphCount = trimmedText
      ? trimmedText.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
      : 0;

    return {
      wordCount,
      charCount,
      charCountNoSpaces,
      readingTimeMinutes: readingTimeMinutes.toFixed(2),
      readingTimeSeconds,
      sentenceCount,
      paragraphCount,
    };
  }, [text]);

  // === CASE TRANSFORMATIONS ===
  const toUpperCase = useCallback(() => {
    updateText((prev) => prev.toUpperCase());
  }, [updateText]);

  const toLowerCase = useCallback(() => {
    updateText((prev) => prev.toLowerCase());
  }, [updateText]);

  const toTitleCase = useCallback(() => {
    updateText((prev) =>
      prev.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
    );
  }, [updateText]);

  const toSentenceCase = useCallback(() => {
    updateText((prev) =>
      prev
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase()),
    );
  }, [updateText]);

  // === TEXT OPERATIONS ===
  const removeExtraSpaces = useCallback(() => {
    updateText((prev) => prev.replace(/\s+/g, " ").trim());
  }, [updateText]);

  const reverseText = useCallback(() => {
    updateText((prev) => prev.split("").reverse().join(""));
  }, [updateText]);

  const clearText = useCallback(() => {
    updateText("");
  }, [updateText]);

  // === FIND & REPLACE ===
  const findAndReplace = useCallback(
    (find, replace, replaceAll = true) => {
      if (!find) return 0;

      updateText((prev) => {
        if (replaceAll) {
          // Escape special regex characters
          const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const regex = new RegExp(escaped, "g");
          return prev.replace(regex, replace);
        }
        return prev.replace(find, replace);
      });

      // Return count of matches
      const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const matches = text.match(new RegExp(escaped, "g"));
      return matches ? matches.length : 0;
    },
    [updateText, text],
  );

  const countOccurrences = useCallback(
    (find) => {
      if (!find) return 0;
      const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const matches = text.match(new RegExp(escaped, "g"));
      return matches ? matches.length : 0;
    },
    [text],
  );

  // === ENCODE/DECODE ===
  const encodeBase64 = useCallback(() => {
    try {
      updateText((prev) => btoa(unescape(encodeURIComponent(prev))));
      return true;
    } catch {
      return false;
    }
  }, [updateText]);

  const decodeBase64 = useCallback(() => {
    try {
      updateText((prev) => decodeURIComponent(escape(atob(prev))));
      return true;
    } catch {
      return false;
    }
  }, [updateText]);

  const encodeURL = useCallback(() => {
    updateText((prev) => encodeURIComponent(prev));
  }, [updateText]);

  const decodeURL = useCallback(() => {
    try {
      updateText((prev) => decodeURIComponent(prev));
      return true;
    } catch {
      return false;
    }
  }, [updateText]);

  // === EXPORT ===
  const downloadAsFile = useCallback(
    (filename = "text-utils-export.txt") => {
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    [text],
  );

  // === CLIPBOARD ===
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy:", err);
      return false;
    }
  }, [text]);

  // === HISTORY (UNDO/REDO) ===
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedo.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setText(history[newIndex]);
      isUndoRedo.current = false;
      return true;
    }
    return false;
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedo.current = true;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setText(history[newIndex]);
      isUndoRedo.current = false;
      return true;
    }
    return false;
  }, [historyIndex, history]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    text,
    setText: updateText,
    stats,
    actions: {
      // Case transformations
      toUpperCase,
      toLowerCase,
      toTitleCase,
      toSentenceCase,
      // Text operations
      removeExtraSpaces,
      reverseText,
      clearText,
      copyToClipboard,
      // Find & Replace
      findAndReplace,
      countOccurrences,
      // Encode/Decode
      encodeBase64,
      decodeBase64,
      encodeURL,
      decodeURL,
      // Export
      downloadAsFile,
      // History
      undo,
      redo,
    },
    history: {
      canUndo,
      canRedo,
      length: history.length,
      index: historyIndex,
    },
    isEmpty: text.trim().length === 0,
  };
}
