import { Visibility, VisibilityOff } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getClients } from "../api/client";
import { getCooperatives } from "../api/cooperative";

// const FormContainer = styled(Box)({
//   display: "flex",
//   flexWrap: "wrap",
//   gap: "24px",
//   marginTop: "16px",
//   marginBottom: "16px",
// });

// const FormField = styled(Box)<{ size?: string }>`
//   width: 30%;
//   max-width: ${(props) => props.size || "390px"};
//   min-width: 200px;
//   flex-grow: 1;
// `;

export default function PlanningList() {
  const { control, handleSubmit } = useForm({
    defaultValues: {},
  });

  const [clients, setClients] = useState();
  const [cooperatives, setCooperatives] = useState();

  // const onSubmit = async (data: any) => {};

  useEffect(() => {
    const handleGetClients = async () => {
      try {
        const response = await getClients();
        // console.log("getClients", response);
        setClients(response);
      } catch (error) {
        console.error("Erro ao buscar os clientes:", error);
        return null;
      }
    };

    const handleGetCooperatives = async () => {
      try {
        const response = await getCooperatives();
        // console.log("createCooperative", response);
        setCooperatives(response);
      } catch (error) {
        console.error("Erro ao criar a cooperativa:", error);
        return null;
      }
    };

    handleGetClients();
    handleGetCooperatives();
  }, []);

  console.log("dados", clients, cooperatives);

  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
 
      </form> */}
    </div>
  );
}
