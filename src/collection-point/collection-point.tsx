import { ToggleButton } from "@mui/material";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { tab } from "@testing-library/user-event/dist/tab";
import { styled as styledComponents } from "styled-components";
import CollectionForm from "./collection-form/collection-form";
import { PEVSList } from "./pevs-list/pevs-list";

const StyledContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const StyledTabContainer = styledComponents.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: 100%;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #EBEBEB ;
  background-color: #EBEBEB;
`;

export default function CollectionPoint() {
  // const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("pevs");
  const [selectedPEVS, setSelectedPEVS] = useState();

  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    value: any
  ) => {
    console.log(value);
    setSelectedTab(value);
    setSelectedPEVS(undefined);
  };

  const handleSelectedPevs = (pevs: any) => {
    setSelectedPEVS(pevs);
    console.log(pevs);
    setSelectedTab("coleta");
  };

  return (
    <StyledContainer>
      <StyledTabContainer>
        <ToggleButton
          style={{
            backgroundColor: selectedTab === "pevs" ? "white" : "transparent",
            flex: 1,
            height: "40px",
            borderRadius: "40px",
            border: "0px",
            fontSize: "14px",
            textAlign: "center",
            cursor: "pointer",
            color: "green",
          }}
          value="pevs"
          selected={selectedTab === "pevs"}
          onChange={handleTabChange}
        >
          PEVs
        </ToggleButton>
        <ToggleButton
          style={{
            backgroundColor: selectedTab === "coleta" ? "white" : "transparent",
            flex: 1,
            height: "40px",
            border: "0px",
            borderRadius: "40px",
            fontSize: "14px",
            textAlign: "center",
            cursor: "pointer",
            color: "green",
          }}
          value="coleta"
          selected={selectedTab === "coleta"}
          onChange={handleTabChange}
        >
          Coleta
        </ToggleButton>
      </StyledTabContainer>
      {selectedTab === "pevs" && (
        <PEVSList handleSelectedPevs={handleSelectedPevs} />
      )}
      {selectedTab === "coleta" && <CollectionForm />}
    </StyledContainer>
  );
}
