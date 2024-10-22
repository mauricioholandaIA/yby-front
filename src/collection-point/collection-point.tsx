import { ToggleButton } from "@mui/material";
import { MouseEvent, useState } from "react";
import { styled as styledComponents } from "styled-components";
import CollectionForm from "./collection-form/collection-form";
import PEVSList from "./pevs-list/pevs-list";

const StyledContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const StyledTabContainer = styledComponents.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export default function CollectionPoint() {
  const [selectedTab, setSelectedTab] = useState("PEVS");

  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    value: any
  ) => {
    console.log(value);
    setSelectedTab(value);
  };

  const tabs = ["PEVS", "Coleta"];

  return (
    <StyledContainer>
      <StyledTabContainer>
        {tabs.map((tab, index) => (
          <ToggleButton
            key={index}
            value={tab}
            selected={selectedTab === tab}
            onChange={(event, value) => handleTabChange(event, value)}
            style={{
              backgroundColor: selectedTab === tab ? "green" : "transparent",
              borderColor: "green",
              width: "35%",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid",
              fontSize: "14px",
              textAlign: "center",
              cursor: "pointer",
              color: selectedTab === tab ? "white" : "green",
            }}
          >
            {tab}
          </ToggleButton>
        ))}
      </StyledTabContainer>
      {selectedTab === "PEVS" && <PEVSList />}
      {selectedTab === "Coleta" && <CollectionForm />}
    </StyledContainer>
  );
}
