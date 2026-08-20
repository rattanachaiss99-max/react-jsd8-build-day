import { useState } from "react";
import "./App.css";
import { AddNote } from "./components/AddNote";
import Calender from "./components/Calender";
import { MoodStats } from "./components/MoodStats";
import Mood from "./components/mood";
import Userprofiles from "./components/Userprofiles";

type Note = { id: string; date: string; text: string };

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [moodCounts, setMoodCounts] = useState<Record<string, number>>({});

  function addNote({ date, text }: { date: string; text: string }) {
    setNotes((prev) => [
      { id: crypto.randomUUID(), date, text },
      ...prev.filter((n) => n.date !== date),
    ]);
  }

  // เพิ่มจำนวนทุกครั้งที่กดเลือก mood
  function countMood(label: string) {
    setMoodCounts((prev) => ({
      ...prev,
      [label]: (prev[label] || 0) + 1,
    }));
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-[900px] space-y-6 px-4">
        <Mood onSelect={countMood} />
        <MoodStats counts={moodCounts} />
        <AddNote onAdd={addNote} notes={notes} />
        <Calender moodList={notes} theme="" />
        <Userprofiles counts={moodCounts} />
      </div>
    </div>
  );
}

export default App;
