import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");

  function handleOnChange(event) {
    setText(event.target.value);
  }

  function handleUpClick() {
    setText(text.toUpperCase());
    props.showAlert("Converted to Uppercase", "success");
  }

  function handleLoClick() {
    setText(text.toLowerCase());
    props.showAlert("Converted to Lowercase", "success");
  }

  function handleClear() {
    setText("");
    props.showAlert("Desk Cleared", "success");
  }

  function handleCopy() {
    let text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Text Copied to Clipboard", "success");
  }

  function handleExtraSpaces() {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed", "success");
  }

  return (
    <>
      <div
        className="container my-3"
        style={{
          color: props.mode === "dark" ? "white" : "#22242af2",
        }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
            style={{
              backgroundColor: props.mode === "light" ? "white" : "#22242af2",
              color: props.mode === "dark" ? "white" : "#22242af2",
            }}
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleClear}>
          Clear Text
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleCopy}>
          Copy Text
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove extra space
        </button>
      </div>
      <div
        className="container my-3"
        style={{
          color: props.mode === "dark" ? "white" : "#22242af2",
        }}
      >
        <h2>Your text summary</h2>
        <p>
          {text.split(" ").length} words & {text.length} characters
        </p>
        <p>{0.08 * text.split(" ").length} Minutes read</p>
        <h2>Preview</h2>
        <p>
          {text.length > 0
            ? text
            : "Enter something in the textbox above to preview it here"}
        </p>
      </div>
    </>
  );
}
