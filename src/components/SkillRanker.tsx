import { useState } from "react";

interface SkillRankerProps {
  initial: string[];
}

// Extra credit (HTML5 Drag and Drop API): visitors drag skills to reorder them.
// Up/down buttons do the same thing for keyboard and touch users.
function SkillRanker({ initial }: SkillRankerProps) {
  const [items, setItems] = useState<string[]>(initial);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length || from === to) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setItems(next);
    setMessage(`${moved} moved to position ${to + 1}`);
  };

  return (
    <div>
      <ol className="ranker">
        {items.map((item, index) => (
          <li
            key={item}
            className={dragIndex === index ? "ranker-item is-dragging" : "ranker-item"}
            draggable
            onDragStart={(e) => {
              setDragIndex(index);
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", String(index));
            }}
            onDragOver={(e) => e.preventDefault()} // needed so the item accepts a drop
            onDrop={(e) => {
              e.preventDefault();
              const from = Number(e.dataTransfer.getData("text/plain"));
              move(from, index);
              setDragIndex(null);
            }}
            onDragEnd={() => setDragIndex(null)}
          >
            <span className="ranker-handle" aria-hidden="true">⋮⋮</span>
            <span className="ranker-label">{item}</span>
            <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} aria-label={`Move ${item} up`}>
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(index, index + 1)}
              disabled={index === items.length - 1}
              aria-label={`Move ${item} down`}
            >
              ↓
            </button>
          </li>
        ))}
      </ol>
      <p className="visually-hidden" aria-live="polite">{message}</p>
    </div>
  );
}

export default SkillRanker;
