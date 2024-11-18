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
    // createdAt: "2024-11-11T14:08:48.933Z";
    // documentId: "bjnby5in8nhlglbgwat2r70f";
    // id: 8;
    // locale: null;
    // publishedAt: "2024-11-11T14:08:48.931Z";
    // updatedAt: "2024-11-11T14:08:48.933Z";
    // waste: "metal";
    // weight: "200";

    const formattedData = data.map((collection: any) => {
      return {
        documentId: collection.documentId,
        id: collection.id,
        pev: collection.client.social_name,
        waste: collection.waste,
        weight: collection.weight,
        createdAt: collection.createdAt,
        imageAvaria: collection.breakdown.url,
        imageColectorUrl: collection.colector.url,
      };
    });

    return formattedData;

    // return {
    //   id: collection.id,
    //   name: collection.name,
    //   status: collection.status,
    //   date: collection.date,
    // };
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
