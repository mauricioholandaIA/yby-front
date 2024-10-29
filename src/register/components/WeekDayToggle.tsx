import { ToggleButton } from "@mui/material";
import { useEffect, useState } from "react";

interface Day {
  [key: string]: boolean;
}

interface WeekDayToggleProps {
  onChange: (days: string[]) => void;
  selectedDays: string[];
}

const WeekDayToggle = ({ onChange, selectedDays }: WeekDayToggleProps) => {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const [localSelectedDays, setLocalSelectedDays] = useState<Day>({
    Seg: false,
    Ter: false,
    Qua: false,
    Qui: false,
    Sex: false,
    Sáb: false,
    Dom: false,
  });

  useEffect(() => {
    const updatedSelectedDays = days.reduce((acc, day) => {
      acc[day] = selectedDays.includes(day);
      return acc;
    }, {} as Day);
    setLocalSelectedDays(updatedSelectedDays);
  }, [selectedDays]);

  const handleDayChange = (day: string) => {
    const newSelectedDays = {
      ...localSelectedDays,
      [day]: !localSelectedDays[day],
    };
    setLocalSelectedDays(newSelectedDays);

    onChange(
      Object.keys(newSelectedDays).filter((day) => newSelectedDays[day])
    );
  };

  return (
    <div>
      <div
        style={{ fontSize: "12px", marginBottom: "5px", marginTop: "-18px" }}
      >
        Disponibilidade para coleta*
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        {days.map((day, index) => (
          <ToggleButton
            key={index}
            value={day}
            selected={localSelectedDays[day]}
            onChange={() => handleDayChange(day)}
            style={{
              backgroundColor: localSelectedDays[day] ? "green" : "transparent",
              borderColor: "green",
              width: "13%",
              height: "35px",
              borderRadius: "5px",
              border: "1px solid",
              fontSize: "14px",
              textAlign: "center",
              cursor: "pointer",
              color: localSelectedDays[day] ? "white" : "green",
            }}
          >
            {day}
          </ToggleButton>
        ))}
      </div>
    </div>
  );
};

export default WeekDayToggle;
