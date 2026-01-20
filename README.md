# ✨ TextUtils

A powerful, modern text manipulation tool built with React and Vite. Transform, analyze, and encode your text with a beautiful, responsive interface.

---

## ✅ Features

### Text Transformations

- UPPERCASE / lowercase / Title Case / Sentence case
- Remove extra spaces
- Reverse text

### Find & Replace

- Real-time match counting
- Replace all occurrences

### Encode / Decode

- Base64 encoding/decoding
- URL encoding/decoding

### More Tools

- 📋 Copy to clipboard
- 💾 Download as .txt file
- ↩️ Undo / ↪️ Redo (50 steps)
- 🌙 Dark mode with system preference detection

### Text Statistics

- Word count
- Character count (with/without spaces)
- Sentence count
- Reading time estimate

---

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **CSS Variables** - Theming system
- **Context API** - State management

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/matin676/Text-Utils.git
cd Text-Utils

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🚀 Deployment

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI (Button, Toast)
│   ├── layout/          # Header
│   └── features/        # TextEditor
├── context/             # ThemeContext, ToastContext
├── hooks/               # useTextUtils, useLocalStorage
└── styles/              # CSS variables & animations
```

---

## 👨‍💻 Author

**Matin Imam**

---

## 📄 License

MIT License
