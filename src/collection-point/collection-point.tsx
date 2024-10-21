import { ToggleButton } from "@mui/material";
import { Box, styled, width } from "@mui/system";
import { tab } from "@testing-library/user-event/dist/tab";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { styled as styledComponents } from "styled-components";
import CollectionList from "./collection-list/collection-list";
import PEVSForm from "./pevs-form/pevs-form";

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
  const [selectedTab, setSelectedTab] = React.useState("PEVS");

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    value: string
  ) => {
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
            onChange={handleTabChange}
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
      {selectedTab === "PEVS" && <PEVSForm />}
      {selectedTab === "Coleta" && <CollectionList />}
    </StyledContainer>
  );
}
