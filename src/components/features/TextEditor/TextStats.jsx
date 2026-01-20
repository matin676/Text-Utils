/**
 * TextStats - Displays text statistics with visual flair
 *
 * WHY: Extracted from TextEditor for better modularity.
 * Could be reused in other contexts if needed.
 */

import "./TextStats.css";

export function TextStats({ stats }) {
  const statItems = [
    { label: "Words", value: stats.wordCount, icon: "📝" },
    { label: "Characters", value: stats.charCount, icon: "🔤" },
    { label: "No Spaces", value: stats.charCountNoSpaces, icon: "📊" },
    { label: "Sentences", value: stats.sentenceCount, icon: "📖" },
    { label: "Read Time", value: `${stats.readingTimeSeconds}s`, icon: "⏱️" },
  ];

  return (
    <div className="text-stats">
      <h2 className="text-stats__title">Text Statistics</h2>
      <div className="text-stats__grid">
        {statItems.map((item) => (
          <div key={item.label} className="stat-card">
            <span className="stat-card__icon">{item.icon}</span>
            <span className="stat-card__value">{item.value}</span>
            <span className="stat-card__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
