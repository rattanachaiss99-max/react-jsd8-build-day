import { useMemo } from "react";

const ALL_MOODS = [
  { label: "Happy", emoji: "😄" },
  { label: "OK", emoji: "😐" },
  { label: "Sad", emoji: "🥺" },
  { label: "Angry", emoji: "😡" },
  { label: "Tired", emoji: "😴" },
];

const DEFAULT_AVATAR = "/pic/mood.jpg";

type UserprofilesProps = {
  counts?: Record<string, number>;
  name?: string;
  bio?: string;
  avatar?: string;
};

export default function Userprofiles({
  counts = {},
  name = "คุณผู้ใช้",
  bio = "",
  avatar,
}: UserprofilesProps) {
  const moodSummary = useMemo(() => {
    const list = ALL_MOODS.map((m) => ({
      ...m,
      count: counts[m.label] || 0,
    }));
    const total = list.reduce((sum, m) => sum + m.count, 0);
    const top = [...list].sort((a, b) => b.count - a.count)[0];
    return { list, total, top };
  }, [counts]);

  return (
    <section className="mx-auto max-w-[900px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <img
          src={avatar || DEFAULT_AVATAR}
          alt={name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-slate-200"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
          }}
        />
        <div className="min-w-0">
          <h3 className="truncate text-xl font-bold text-slate-800">{name}</h3>
          {bio && <p className="truncate text-sm text-slate-500">{bio}</p>}
        </div>
      </div>

      {/* Mood summary */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          สรุป Mood ของคุณ
          {moodSummary.total > 0 && (
            <span className="ml-1 normal-case text-slate-400">
              (ทั้งหมด {moodSummary.total} ครั้ง)
            </span>
          )}
        </h4>

        {moodSummary.total === 0 ? (
          <p className="text-sm text-slate-400">
            ยังไม่มีข้อมูล mood — กดเลือกอารมณ์ด้านบนเพื่อเริ่มสะสมสถิติกันเถอะ!
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {moodSummary.list.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-sm"
                  style={{
                    backgroundColor: m.count > 0 ? "#fff7e6" : "#f8fafc",
                  }}
                >
                  <span className="text-lg leading-none">{m.emoji}</span>
                  <span className="text-slate-600">{m.label}</span>
                  <strong
                    className="ml-1"
                    style={{ color: m.count > 0 ? "#2b8a3e" : "#aaa" }}
                  >
                    {m.count}
                  </strong>
                </div>
              ))}
            </div>

            {moodSummary.top.count > 0 && (
              <p className="mt-3 text-sm text-slate-600">
                อารมณ์ที่คุณเป็นบ่อยที่สุดคือ{" "}
                <span className="font-semibold">
                  {moodSummary.top.emoji} {moodSummary.top.label}
                </span>
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
