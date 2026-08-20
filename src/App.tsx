import { useState } from "react";
import "./App.css";
import { AddNote } from "./components/AddNote";
import Calender from "./components/Calender";
import { MoodStats } from "./components/MoodStats";

type Note = { id: string; date: string; text: string };

function App() {
  // add note function
  const [notes, setNotes] = useState<Note[]>([]);

  function addNote({ date, text }: { date: string; text: string }) {
    setNotes((prev) => [
      { id: crypto.randomUUID(), date, text },
      ...prev.filter((n) => n.date !== date),
    ]);
    // add note funtion
  }

  return (
    <>
      <MoodStats />
      <AddNote onAdd={addNote} notes={notes} />
      <Calender moodList={notes} />
    </>
  );
}

export default App;
