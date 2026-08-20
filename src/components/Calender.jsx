export default function Calender({ moodList }) {
  // สร้าง Array ของ 28 วันเหมือนเดิม
  const daysInMonth = Array.from({ length: 28 }, (_, index) => index + 1);

  // ฟังก์ชันช่วยเปลี่ยนตัวเลขวัน (1-28) ให้เป็น format "YYYY-MM-DD" เพื่อเทียบกับข้อมูลของพี่หยก
  const getFullDate = (day) => {
    const d = new Date();
    // สมมติว่าเป็นเดือนและปีปัจจุบัน
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Mood Calendar</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px" }}>
        {daysInMonth.map((day) => {
          const dateString = getFullDate(day);
          // เทียบข้อมูล: ถ้าวันที่ตรงกัน ให้ดึงข้อมูลมาแสดง
          const entry = moodList?.find((item) => item.date === dateString);

          return (
            <div key={day} style={{ border: "1px solid #ccc", padding: "10px", minHeight: "80px" }}>
              <strong>{day}</strong>
              {entry && (
                <div style={{ fontSize: "12px", marginTop: "5px" }}>
                  <p>{entry.text}</p> {/* แสดงโน้ตที่พี่หยกบันทึก */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}