import React from "react";

const ALL_MOODS = [
  { label: "Happy", emoji: "😄" },
  { label: "OK", emoji: "😐" },
  { label: "Sad", emoji: "🥺" },
  { label: "Angry", emoji: "😡" },
  { label: "Tired", emoji: "😴" },
];

export const MoodStats = ({ counts = {} }) => {
  const moodCounts = ALL_MOODS.map((m) => ({
    label: m.label,
    emoji: m.emoji,
    count: counts[m.label] || 0,
  }));

  const sortedMoods = [...moodCounts].sort((a, b) => b.count - a.count);
  // ...ที่เหลือเหมือนเดิม

  return (
    <div style={{ marginTop: 20 }}>
      <h4 style={{ color: "#555", marginBottom: 10 }}>
        MOOD COUNTS (เรียงจากมากไปน้อย)
      </h4>

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {sortedMoods.map((item) => (
          <div
            key={item.label}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: 12,
              padding: "10px 16px",
              textAlign: "center",
              minWidth: 60,
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: 24 }}>{item.emoji}</div>
            <div style={{ fontSize: 12, color: "#666", margin: "4px 0" }}>
              {item.label}
            </div>
            <strong
              style={{
                fontSize: 18,
                color: item.count > 0 ? "#2b8a3e" : "#aaa",
              }}
            >
              {item.count}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
};
