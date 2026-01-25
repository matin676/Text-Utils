/**
 * TextEditor - Main text manipulation feature
 *
 * Features:
 * - Text transformations (case, spaces, reverse)
 * - Find & Replace
 * - Encode/Decode (Base64, URL)
 * - Export as file
 * - Undo/Redo history
 */
import { useState } from "react";
import { useTextUtils } from "../../../hooks/useTextUtils";
import { useToast } from "../../../context/ToastContext";
import { Button } from "../../common/Button";
import { TextStats } from "./TextStats";
import ReactMarkdown from "react-markdown";
import {
  Undo,
  Redo,
  Search,
  Download,
  Copy,
  Trash2,
  FileJson,
  ArrowUpDown,
  ListX,
  Eye,
  Type,
  AlignLeft,
  ALargeSmall,
  RotateCcw,
} from "lucide-react";
import "./TextEditor.css";

export function TextEditor() {
  const { text, setText, stats, actions, history, isEmpty } = useTextUtils();
  const toast = useToast();

  // Find & Replace state
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);

  // Wrap actions with toast notifications
  const handleAction = (action, message) => {
    action();
    toast.success(message);
  };

  const handleCopy = async () => {
    const success = await actions.copyToClipboard();
    if (success) {
      toast.success("Copied to clipboard!");
    } else {
      toast.error("Failed to copy");
    }
  };

  const handleFindReplace = () => {
    if (!findText) {
      toast.warning("Enter text to find");
      return;
    }
    const count = actions.countOccurrences(findText);
    if (count === 0) {
      toast.info("No matches found");
      return;
    }
    actions.findAndReplace(findText, replaceText);
    toast.success(`Replaced ${count} occurrence${count > 1 ? "s" : ""}`);
  };

  const handleEncode = (type) => {
    if (type === "base64") {
      const success = actions.encodeBase64();
      success
        ? toast.success("Encoded to Base64")
        : toast.error("Encoding failed");
    } else {
      actions.encodeURL();
      toast.success("URL encoded");
    }
  };

  const handleDecode = (type) => {
    if (type === "base64") {
      const success = actions.decodeBase64();
      success
        ? toast.success("Decoded from Base64")
        : toast.error("Invalid Base64");
    } else {
      const success = actions.decodeURL();
      success
        ? toast.success("URL decoded")
        : toast.error("Invalid URL encoding");
    }
  };

  const handleDownload = () => {
    actions.downloadAsFile();
    toast.success("File downloaded!");
  };

  const handleFormatJSON = () => {
    const success = actions.formatJSON();
    success ? toast.success("JSON Formatted") : toast.error("Invalid JSON");
  };

  const handleUndo = () => {
    if (actions.undo()) {
      toast.info("Undo");
    }
  };

  const handleRedo = () => {
    if (actions.redo()) {
      toast.info("Redo");
    }
  };

  return (
    <main className="text-editor">
      <div className="text-editor__header">
        <h1 className="text-editor__title">Transform Your Text</h1>
        <p className="text-editor__subtitle">
          Powerful text manipulation tools at your fingertips
        </p>
      </div>

      <div className="text-editor__content stagger-children">
        {/* History Controls */}
        <div className="text-editor__toolbar">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUndo}
            disabled={!history.canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo size={16} /> Undo
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRedo}
            disabled={!history.canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo size={16} /> Redo
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFindReplace(!showFindReplace)}
          >
            <Search size={16} /> Find & Replace
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            disabled={isEmpty}
          >
            <Download size={16} /> Download
          </Button>
        </div>

        {/* Find & Replace Panel */}
        {showFindReplace && (
          <div className="text-editor__find-replace">
            <input
              type="text"
              placeholder="Find..."
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              className="text-editor__input"
            />
            <input
              type="text"
              placeholder="Replace with..."
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              className="text-editor__input"
            />
            <Button size="sm" onClick={handleFindReplace}>
              Replace All
            </Button>
            <span className="text-editor__match-count">
              {findText && `${actions.countOccurrences(findText)} matches`}
            </span>
          </div>
        )}

        {/* Text Input Area */}
        <div className="text-editor__input-wrapper">
          <textarea
            id="text-input"
            className="text-editor__textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            aria-label="Text input"
            rows={8}
          />
          <div className="text-editor__char-count">
            {stats.charCount} characters
          </div>
        </div>

        {/* Case Transformation Buttons */}
        <div className="text-editor__section">
          <h3 className="text-editor__section-label">Case Transformations</h3>
          <div className="text-editor__actions">
            <Button
              onClick={() =>
                handleAction(actions.toUpperCase, "Converted to UPPERCASE")
              }
              disabled={isEmpty}
            >
              <ALargeSmall size={16} /> UPPERCASE
            </Button>
            <Button
              onClick={() =>
                handleAction(actions.toLowerCase, "Converted to lowercase")
              }
              disabled={isEmpty}
            >
              <ALargeSmall size={16} /> lowercase
            </Button>
            <Button
              onClick={() =>
                handleAction(actions.toTitleCase, "Converted to Title Case")
              }
              disabled={isEmpty}
            >
              <Type size={16} /> Title Case
            </Button>
            <Button
              onClick={() =>
                handleAction(
                  actions.toSentenceCase,
                  "Converted to Sentence case",
                )
              }
              disabled={isEmpty}
            >
              <AlignLeft size={16} /> Sentence case
            </Button>
          </div>
        </div>

        {/* Text Operations */}
        <div className="text-editor__section">
          <h3 className="text-editor__section-label">Text Operations</h3>
          <div className="text-editor__actions">
            <Button
              variant="secondary"
              onClick={() =>
                handleAction(actions.removeExtraSpaces, "Extra spaces removed")
              }
              disabled={isEmpty}
            >
              <ListX size={16} /> Remove Spaces
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleAction(actions.reverseText, "Text reversed")}
              disabled={isEmpty}
            >
              <RotateCcw size={16} /> Reverse
            </Button>
            <Button variant="ghost" onClick={handleCopy} disabled={isEmpty}>
              <Copy size={16} /> Copy
            </Button>
            <Button
              variant="danger"
              onClick={() => handleAction(actions.clearText, "Text cleared")}
              disabled={isEmpty}
            >
              <Trash2 size={16} /> Clear
            </Button>
          </div>
        </div>

        {/* Advanced Tools */}
        <div className="text-editor__section">
          <h3 className="text-editor__section-label">Advanced Tools</h3>
          <div className="text-editor__actions">
            <Button
              variant="secondary"
              onClick={() =>
                handleAction(actions.removeDuplicates, "Duplicates removed")
              }
              disabled={isEmpty}
            >
              <ListX size={16} /> Remove Duplicates
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                handleAction(() => actions.sortLines("asc"), "Sorted A-Z")
              }
              disabled={isEmpty}
            >
              <ArrowUpDown size={16} /> Sort A-Z
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                handleAction(() => actions.sortLines("desc"), "Sorted Z-A")
              }
              disabled={isEmpty}
            >
              <ArrowUpDown size={16} /> Sort Z-A
            </Button>
            <Button
              variant="secondary"
              onClick={handleFormatJSON}
              disabled={isEmpty}
            >
              <FileJson size={16} /> Format JSON
            </Button>
          </div>
        </div>

        {/* Encode/Decode */}
        <div className="text-editor__section">
          <h3 className="text-editor__section-label">Encode / Decode</h3>
          <div className="text-editor__actions">
            <Button
              variant="secondary"
              onClick={() => handleEncode("base64")}
              disabled={isEmpty}
            >
              Base64 Encode
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleDecode("base64")}
              disabled={isEmpty}
            >
              Base64 Decode
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleEncode("url")}
              disabled={isEmpty}
            >
              URL Encode
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleDecode("url")}
              disabled={isEmpty}
            >
              URL Decode
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <TextStats stats={stats} />

        {/* Preview */}
        <div className="text-editor__preview">
          <div className="text-editor__preview-header">
            <h2 className="text-editor__section-title">Preview</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMarkdownMode(!isMarkdownMode)}
              disabled={isEmpty}
            >
              {isMarkdownMode ? (
                <>
                  <Type size={16} /> Show Raw Text
                </>
              ) : (
                <>
                  <Eye size={16} /> Markdown Preview
                </>
              )}
            </Button>
          </div>
          <div className="text-editor__preview-content">
            {isEmpty ? (
              <p className="text-editor__placeholder">
                Your transformed text will appear here...
              </p>
            ) : isMarkdownMode ? (
              <div className="markdown-preview">
                <ReactMarkdown>{text}</ReactMarkdown>
              </div>
            ) : (
              <p>{text}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
