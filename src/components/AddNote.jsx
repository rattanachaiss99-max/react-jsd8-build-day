import { useState } from "react";

// หา "วันนี้" แบบ local time
function getToday() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function AddNote({ onAdd }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState(getToday);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    onAdd({ date, text: trimmed });

    setText("");
    setDate(getToday());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 p-4"
    >
      <label htmlFor="note-date" className="block mb-2 text-sm text-slate-600">
        Date
      </label>
      <input
        id="note-date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full rounded-lg border border-slate-200 p-2 mb-4"
      />

      <label htmlFor="note-text" className="block mb-2 text-sm text-slate-600">
        Note
      </label>
      <textarea
        id="note-text"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full rounded-lg border border-slate-200 p-3 resize-none
                   focus:outline-none focus:ring-2 focus:ring-slate-400"
      />

      <button
        type="submit"
        disabled={!text.trim()}
        className="mt-4 w-full rounded-lg py-3 font-semibold text-white
                   bg-slate-800 hover:bg-slate-700
                   disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        Save Note
      </button>
    </form>
  );
}
