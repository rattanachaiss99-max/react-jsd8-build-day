import React from "react";

export default function Calender({ moodList }) {
  // สร้าง Array ของ 28 วัน (1 ถึง 28)
  const daysInMonth = Array.from({ length: 28 }, (_, index) => index + 1);

  // ฟังก์ชันแปลงเลขวัน (1-28) ให้เป็นรูปแบบ "YYYY-MM-DD" เพื่อเทียบกับวันที่พี่หยกกรอกมา
  const getFullDate = (day) => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Mood Calendar (28 วัน)</h2>
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(7, 1fr)", 
          gap: "10px",
          marginTop: "20px" 
        }}
      >
        {daysInMonth.map((day) => {
          const dateString = getFullDate(day);
          
          // ค้นหาข้อมูลใน moodList (ที่มาจาก App.jsx ซึ่งรับมาจาก AddNote ของพี่หยก) 
          // ว่ามีอันไหนวันที่ตรงกับช่องนี้บ้าง
          const entry = moodList?.find((item) => item.date === dateString);

          return (
            <div
              key={day}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                minHeight: "80px",
                backgroundColor: entry ? "#e6fffa" : "#fff", // ถ้ามีโน้ต ไฮไลท์สีฟ้าอ่อน
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* แสดงตัวเลขวันที่ */}
              <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                {day}
              </span>

              {/* ถ้าวันนั้นมีข้อมูลที่พี่หยกบันทึกไว้ ให้แสดงข้อความ Note ออกมา */}
              {entry && (
                <div style={{ fontSize: "11px", color: "#2d3748", marginTop: "5px", wordBreak: "break-word" }}>
                  <p>{entry.text}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}