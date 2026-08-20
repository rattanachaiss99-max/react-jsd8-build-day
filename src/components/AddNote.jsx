import { useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

const now = new Date();
const YEAR = now.getFullYear();
const MONTH = pad(now.getMonth() + 1);

const DAY_NUMBER = Math.min(now.getDate(), 28);
const TODAY = `${YEAR}-${MONTH}-${pad(DAY_NUMBER)}`;

const toDate = (day) => `${YEAR}-${MONTH}-${pad(day)}`;

// นับถอยหลังจากวันนี้ ว่าบันทึกติดกันกี่วัน
function calcStreak(notes) {
  const saved = new Set((notes || []).map((n) => n.date));
  let streak = 0;

  for (let day = DAY_NUMBER; day >= 1; day--) {
    if (!saved.has(toDate(day))) break;
    streak++;
  }
  return streak;
}

export function AddNote({ onAdd, notes }) {
  const [text, setText] = useState("");

  const list = notes || [];
  const streak = calcStreak(list);
  const total = list.length;
  const todayNote = list.find((n) => n.date === TODAY);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAdd({ date: TODAY, text: trimmed });
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 p-4"
    >
      {/* กล่องสถิติ */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-100 px-4 py-3 text-center">
          <p className="text-sm text-slate-500">Login วันที่</p>
          <p className="text-2xl font-bold text-slate-800">
            {DAY_NUMBER}{" "}
            <span className="text-base font-normal text-slate-400">/ 28</span>
          </p>
        </div>

        <div className="rounded-lg bg-amber-100 px-4 py-3 text-center">
          <p className="text-sm text-amber-700">บันทึกต่อเนื่อง</p>
          <p className="text-2xl font-bold text-amber-800">
            🔥 {streak}{" "}
            <span className="text-base font-normal text-amber-600">วัน</span>
          </p>
        </div>
      </div>

      {/* แถบความคืบหน้า */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-xs text-slate-500">
          <span>ความคืบหน้า</span>
          <span>{total} / 28 วัน</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-300"
            style={{ width: `${Math.min((total / 28) * 100, 100)}%` }}
          />
        </div>
      </div>

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
      <p className="mt-1 text-right text-xs text-slate-400">
        {text.length} ตัวอักษร
      </p>

      <button
        type="submit"
        disabled={!text.trim()}
        className="mt-3 w-full rounded-lg py-3 font-semibold text-white
                   bg-slate-800 hover:bg-slate-700
                   disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        {todayNote ? "อัปเดตโน้ตวันนี้" : "Save Note"}
      </button>

      {/* โน้ตของวันนี้ */}
      {todayNote && (
        <div className="mt-3 rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-400">บันทึกไว้แล้ววันนี้</p>
          <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">
            {todayNote.text}
          </p>
        </div>
      )}
    </form>
  );
}
