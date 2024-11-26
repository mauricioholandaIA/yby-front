import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { styled as styledComponents } from "styled-components";
import { getPlanningList } from "../api/planning";
import TableComponent from "./components/planning-table";

const StyledContainer = styledComponents.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
    width: 100%;
`;

const StyledCenterContainer = styledComponents.div`
    padding: 50px 40px 0;
`;

const PlanningList = () => {
  const [planningList, setPlanningList] = useState([]);

  useEffect(() => {
    const handleGetPlanningList = async () => {
      try {
        const response = await getPlanningList();
        setPlanningList(response.data);
      } catch (error) {
        console.error("Erro ao buscar os planejamentos:", error);
        return null;
      }
    };

    handleGetPlanningList();
  }, []);

  return (
    <StyledContainer>
      <StyledCenterContainer>
        <Typography
          style={{ fontSize: "32px", fontWeight: "600", color: "#4B3838" }}
        >
          Planejamento Geral
        </Typography>

        <TableComponent planningList={planningList} />
      </StyledCenterContainer>
    </StyledContainer>
  );
};

export default PlanningList;
