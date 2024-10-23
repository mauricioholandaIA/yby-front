import { ToggleButton } from "@mui/material";
import { useState } from "react";

interface Day {
  [key: string]: boolean;
}
const WeekDayToggle = () => {
  const [selectedDays, setSelectedDays] = useState<Day>({
    Seg: false,
    Ter: false,
    Qua: false,
    Qui: false,
    Sex: false,
    Sáb: false,
    Dom: false,
  });

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const handleDayChange = (day: string) => {
    setSelectedDays((prevSelectedDays: Day) => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }));
  };

  return (
    <div>
      <div
        style={{ fontSize: "12px", marginBottom: "5px", marginTop: "-18px" }}
      >
        Disponibilidade para coleta*
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        {days.map((day, index) => {
          return (
            <ToggleButton
              key={index}
              value={day}
              selected={selectedDays[day]}
              onChange={() => handleDayChange(day)}
              style={{
                backgroundColor: selectedDays[day] ? "green" : "transparent",
                borderColor: "green",
                width: "13%",
                height: "35px",
                borderRadius: "5px",
                border: "1px solid",
                fontSize: "14px",
                textAlign: "center",
                cursor: "pointer",
                color: selectedDays[day] ? "white" : "green",
              }}
            >
              {day}
            </ToggleButton>
          );
        })}
      </div>
    </div>
  );
};

export default WeekDayToggle;
