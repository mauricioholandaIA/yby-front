import { Tab, Table, Tabs, Typography } from "@mui/material";
import { type } from "os";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { styled as styledComponents } from "styled-components";
import { getCollection } from "../api/collection";
import TableComponent from "./components/table";

const StyledContainer = styledComponents.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
    width: 100%;
`;

const StyledCenterContainer = styledComponents.div`
    padding: 40px 40px 0;
`;

export default function Reports() {
  const navigate = useNavigate();

  const [collections, setCollections] = useState<any>([]);

  const formatCollection = (data: any) => {
    const formattedData = data.map((collection: any) => {
      const wastes =
        collection?.wastes.map((item: any) => item.name).join(", ") || "";

      const wastesIds = collection?.wastes.map((item: any) => item.id);

      return {
        documentId: collection.documentId,
        id: collection.id || "",
        pev: collection?.client?.social_name || "",
        waste: wastes || "",
        weight: collection?.weight || "",
        createdAt: collection?.createdAt || "",
        imageAvaria: collection?.breakdown?.url || "",
        imageColectorUrl: collection.colector?.url || "",
        wastesIds: wastesIds || [],
      };
    });

    return formattedData;
  };

  useEffect(() => {
    const getCollectionsData = async () => {
      const response = await getCollection();
      //   console.log(response.data);
      const formattedData = formatCollection(response.data);
      setCollections(formattedData);
    };

    getCollectionsData();
  }, []);

  return (
    <StyledContainer>
      <StyledCenterContainer>
        <Typography variant="h4" component="h1">
          Relatorios
        </Typography>

        <TableComponent collections={collections} />
      </StyledCenterContainer>
    </StyledContainer>
  );
}
