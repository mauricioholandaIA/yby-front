import { ToggleButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { tab } from "@testing-library/user-event/dist/tab";
import { styled as styledComponents } from "styled-components";
import { getClients } from "../api/client";
import { getListOfPevsByCooperative } from "../api/cooperative";
import { AuthContext } from "../context/auth-context";
import CollectionForm from "./collection-form/collection-form";
import { PEVSList } from "./pevs-list/pevs-list";

const StyledContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
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
  const { user: currentUser } = useContext(AuthContext);

  console.log(currentUser);

  const [selectedTab, setSelectedTab] = useState("pevs");
  const [selectedPEVS, setSelectedPEVS] = useState();

  const [pevs, setPevs] = useState<any[]>([]);

  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    value: any
  ) => {
    setSelectedTab(value);
    setSelectedPEVS(undefined);
  };

  const handleSelectedPevs = (pevs: any) => {
    setSelectedPEVS(pevs);
    setSelectedTab("coleta");
  };

  function buscarPorIds(ids: string | any[], getPevs: { data: any[] }) {
    const empresasEncontradas = getPevs?.data.filter(
      (item: { documentId: any }) => ids.includes(item.documentId)
    );
    if (empresasEncontradas.length > 0) {
      return empresasEncontradas;
    } else {
      return [];
      // return `Nenhuma empresa encontrada para os IDs fornecidos.`;
    }
  }

  useEffect(() => {
    console.log(currentUser);

    const handleGetPevs = async () => {
      try {
        const response = await getListOfPevsByCooperative();
        console.log(response.data);
        const resultadoDosIds = response.data
          .filter((item: any) => {
            const dias = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
            return dias.some(
              (dia) =>
                item[dia] &&
                item[dia].documentId === currentUser?.cooperative_id
            );
          })
          .map(
            (item: { client: { documentId: any } }) => item.client.documentId
          );
        console.log("listar os ids", resultadoDosIds);
        const getPevs = await getClients();
        console.log("all clients", getPevs);
        const resultado = buscarPorIds(resultadoDosIds, getPevs);
        console.log("listar os itens", resultado);

        setPevs(resultado);
      } catch (error) {
        console.error("Erro ao buscar os Pevs:", error);
        return null;
      }
    };

    handleGetPevs();
  }, []);

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
        <PEVSList handleSelectedPevs={handleSelectedPevs} pevs={pevs} />
      )}
      {selectedTab === "coleta" && (
        <CollectionForm selectedPEV={selectedPEVS} pevs={pevs} />
      )}
    </StyledContainer>
  );
}
