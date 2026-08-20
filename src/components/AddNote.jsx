import { useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

const now = new Date();
const YEAR = now.getFullYear();
const MONTH_INDEX = now.getMonth();
const MONTH = pad(MONTH_INDEX + 1);

const DAYS_IN_MONTH = new Date(YEAR, MONTH_INDEX + 1, 0).getDate();
const DAY_NUMBER = now.getDate();
const TODAY = `${YEAR}-${MONTH}-${pad(DAY_NUMBER)}`;

const toDate = (day) => `${YEAR}-${MONTH}-${pad(day)}`;

// นับถอยหลังจากวันนี้ ว่าบันทึกติดกันกี่วัน
function calcStreak(saved) {
  let streak = 0;
  for (let day = DAY_NUMBER; day >= 1; day--) {
    if (!saved.has(toDate(day))) break;
    streak++;
  }
  return streak;
}

// หาช่วงที่บันทึกติดกันยาวที่สุดในเดือนนี้
function calcBestStreak(saved) {
  let best = 0;
  let run = 0;
  for (let day = 1; day <= DAY_NUMBER; day++) {
    if (saved.has(toDate(day))) {
      run++;
      best = Math.max(best, run);
    } else {
      run = 0;
    }
  }
  return best;
}

export function AddNote({ onAdd, notes }) {
  const [text, setText] = useState("");

  const list = notes || [];
  const prefix = `${YEAR}-${MONTH}`;

  // เก็บเฉพาะวันที่ของเดือนนี้ไว้ใน Set เพื่อเช็คได้เร็ว
  const saved = new Set(
    list.filter((n) => n.date.startsWith(prefix)).map((n) => n.date),
  );

  const total = saved.size;
  const streak = calcStreak(saved);
  const bestStreak = calcBestStreak(saved);
  const missed = DAY_NUMBER - total;

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
      className="rounded-2xl border border-slate-300 bg-white p-8 shadow-sm"
    >
      {/* กล่องสถิติ */}
      <div className="mb-6 grid grid-cols-4 gap-3">
        <StatBox
          label="Login วันที่"
          value={DAY_NUMBER}
          sub={`/ ${DAYS_IN_MONTH}`}
        />
        <StatBox
          label="ต่อเนื่อง"
          value={`🔥 ${streak}`}
          sub="วัน"
          tone="amber"
        />
        <StatBox
          label="ขาด"
          value={missed}
          sub="วัน"
          tone={missed > 0 ? "rose" : "slate"}
        />
        <StatBox label="สถิติสูงสุด" value={bestStreak} sub="วัน" />
      </div>

      {/* แถบความคืบหน้า */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs text-slate-500">
          <span>ความคืบหน้าเดือนนี้</span>
          <span className="font-medium text-slate-600">
            {total} / {DAYS_IN_MONTH} วัน
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-500"
            style={{
              width: `${Math.min((total / DAYS_IN_MONTH) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* ช่องกรอก */}
      <label
        htmlFor="note-text"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Note
      </label>
      <textarea
        id="note-text"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full resize-none rounded-xl border border-slate-300 p-4 text-slate-700
                   placeholder:text-slate-400
                   focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
      />
      <p className="mt-1.5 text-right text-xs text-slate-400">
        {text.length} ตัวอักษร
      </p>

      <button
        type="submit"
        disabled={!text.trim()}
        className="mt-4 w-full rounded-xl bg-slate-800 py-3.5 font-semibold text-white
                   transition-colors hover:bg-slate-700
                   disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        {todayNote ? "อัปเดตโน้ตวันนี้" : "Save Note"}
      </button>

      {/* โน้ตของวันนี้ */}
      {todayNote && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            บันทึกไว้แล้ววันนี้
          </p>
          <p className="mt-1.5 whitespace-pre-wrap text-sm text-slate-700">
            {todayNote.text}
          </p>
        </div>
      )}
    </form>
  );
}

// กล่องสถิติย่อย — ใช้ซ้ำ 4 ครั้ง
function StatBox({ label, value, sub, tone = "slate" }) {
  const styles = {
    slate: {
      box: "border-slate-200 bg-slate-50",
      label: "text-slate-500",
      value: "text-slate-800",
      sub: "text-slate-400",
    },
    amber: {
      box: "border-amber-200 bg-amber-50",
      label: "text-amber-600",
      value: "text-amber-700",
      sub: "text-amber-500",
    },
    rose: {
      box: "border-rose-200 bg-rose-50",
      label: "text-rose-600",
      value: "text-rose-700",
      sub: "text-rose-400",
    },
  };

  const s = styles[tone];

  return (
    <div className={`rounded-xl border px-3 py-4 text-center ${s.box}`}>
      <p className={`text-xs uppercase tracking-wide ${s.label}`}>{label}</p>
      <p className={`mt-1 text-2xl font-bold ${s.value}`}>
        {value}
        {sub && (
          <span className={`ml-1 text-sm font-normal ${s.sub}`}>{sub}</span>
        )}
      </p>
    </div>
  );
}
