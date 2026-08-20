import React, { useState } from "react";

export default function Calender({ moodList, theme }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); 

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];
  const currentMonthName = monthNames[month];
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // ฟังก์ชันเสียงคลิก
  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(500, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  };

  const handlePrevMonth = () => {
    playClickSound();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    playClickSound();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  const blanks = Array.from({ length: firstDayIndex }, () => null);
  const daysInMonth = Array.from({ length: totalDays }, (_, index) => index + 1);
  const allCalendarCells = [...blanks, ...daysInMonth];

  const getFullDate = (day) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${year}-${pad(month + 1)}-${pad(day)}`;
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  // เผื่อกรณีใช้งานแบบเดี่ยวๆ ให้ดึงจาก moodList ถ้าไม่มีให้เป็นอาเรย์ว่าง
  const entries = moodList || [];

  return (
    <div 
      style={{ 
        padding: "35px", 
        backgroundColor: "#ffffff", 
        border: "1px solid #cbd5e1",
        borderRadius: "16px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "inherit"
      }}
    >
      {/* ส่วนหัวข้อ + ปุ่มเปลี่ยนเดือน */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", borderBottom: "1px solid #e2e8f0", paddingBottom: "15px" }}>
        <button 
          onClick={handlePrevMonth}
          style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", padding: "6px 14px", cursor: "pointer", fontWeight: "bold", borderRadius: "8px" }}
        >
          ◀ Prev
        </button>

        <div style={{ textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#1e293b" }}>
            {currentMonthName}
          </h1>
          <span style={{ fontSize: "14px", color: "#64748b" }}>
            {year}
          </span>
        </div>

        <button 
          onClick={handleNextMonth}
          style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", padding: "6px 14px", cursor: "pointer", fontWeight: "bold", borderRadius: "8px" }}
        >
          Next ▶
        </button>
      </div>

      {/* แถวหัวข้อวัน */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", fontWeight: "bold", marginBottom: "12px", fontSize: "14px", color: "#475569" }}>
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      
      {/* ตารางปฏิทิน */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(7, 1fr)", 
          gap: "6px",
          backgroundColor: "#cbd5e1",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          padding: "6px"
        }}
      >
        {allCalendarCells.map((day, index) => {
          if (day === null) {
            return <div key={`blank-${index}`} style={{ backgroundColor: "#f8fafc", minHeight: "100px", borderRadius: "4px" }} />;
          }

          const dateString = getFullDate(day);
          const entry = entries.find((item) => item.date === dateString);
          const todayCheck = isToday(day);

          return (
            <div
              key={day}
              onClick={playClickSound}
              style={{
                backgroundColor: todayCheck ? "#e0f2fe" : "#ffffff",
                padding: "8px",
                minHeight: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "6px",
                cursor: "pointer",
                border: todayCheck ? "2px solid #0284c7" : "1px solid transparent"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "bold", fontSize: "13px", color: todayCheck ? "#0284c7" : "#334155" }}>
                  {day}
                </span>
                {todayCheck && (
                  <span style={{ fontSize: "8px", backgroundColor: "#0284c7", color: "#fff", padding: "1px 4px", borderRadius: "4px", fontWeight: "bold" }}>
                    TODAY
                  </span>
                )}
              </div>

              {/* แสดงข้อความโน้ต */}
              {entry && (
                <div style={{ backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", padding: "4px", borderRadius: "4px", marginTop: "auto" }}>
                  <p style={{ margin: 0, fontSize: "10px", color: "#1e293b", wordBreak: "break-word", lineHeight: "1.2" }}>
                    {entry.text}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}