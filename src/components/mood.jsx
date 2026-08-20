import { useState } from 'react'

const MOODS = [
  { id: 'happy', label: 'Happy', value: 5, emoji: '😊' },
  { id: 'ok', label: 'OK', value: 4, emoji: '🙂' },
  { id: 'sad', label: 'Sad', value: 3, emoji: '😔' },
  { id: 'angry', label: 'Angry', value: 2, emoji: '😠' },
  { id: 'tired', label: 'Tired', value: 1, emoji: '😴' },
]

function Mood({ mood = 0, setMood = () => {} }) {
  const [selected, setSelected] = useState(mood)

  const handleSelect = (value) => {
    setSelected(value)
    setMood(value)
  }

  const selectedMood = MOODS.find((m) => m.value === selected)

  return (
    <>
      <style>{`
        .mood-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 32px;
        }
        .mood-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .mood-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 16px;
          min-width: 90px;
          border: 2px solid #ccc;
          border-radius: 12px;
          background: #fff;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .mood-btn:hover {
          background: #ffe9a8;
          border-color: #ffb800;
          transform: translateY(-4px);
        }
        .mood-btn.active {
          background: #ffb800;
          border-color: #e0a000;
        }
        .mood-emoji {
          font-size: 32px;
        }
        .mood-result {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
      <section className="mood-section">
      <h2>How are you feeling today?</h2>
      <div className="mood-buttons">
        {MOODS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`mood-btn${selected === m.value ? ' active' : ''}`}
            onClick={() => handleSelect(m.value)}
          >
            <span className="mood-emoji">{m.emoji}</span>
            <span className="mood-label">{m.label}</span>
            <span className="mood-value">{m.value}</span>
          </button>
        ))}
      </div>
      <p className="mood-result">
        {selected > 0 ? (
          <>
            Your mood: {selectedMood.label} ({selectedMood.value})
          </>
        ) : (
          'Please select a mood'
        )}
      </p>
      </section>
    </>
  )
}

export default Mood
