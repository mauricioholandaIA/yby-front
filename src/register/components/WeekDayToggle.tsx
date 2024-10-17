import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

const WeekDayToggle = () => {
  const [selected, setSelected] = React.useState(false);

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

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
              selected={selected}
              onChange={() => setSelected((prevSelected) => !prevSelected)}
              style={{
                backgroundColor: selected ? "green" : "transparent",
                borderColor: "green",
                width: "50px",
                height: "35px",
                borderRadius: "5px",
                border: "1px solid",
                fontSize: "14px",
                textAlign: "center",
                cursor: "pointer",
                color: selected ? "white" : "green",
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

{
  /* <ToggleButton
  value="check"
  selected={selected}
  onChange={() => setSelected((prevSelected) => !prevSelected)}
>
  S
</ToggleButton>; */
}
