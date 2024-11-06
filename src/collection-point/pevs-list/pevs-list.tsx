import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getClients, getSingleClients } from "../../api/client";
import { getListOfPevsByCooperative } from "../../api/cooperative";
import { AuthContext } from "../../context/auth-context";

export const PEVSList = ({
  handleSelectedPevs,
}: {
  handleSelectedPevs: any;
}) => {
  const { user: currentUser } = useContext(AuthContext);
  // const cards = [
  //   { title: "Card 1", subtitle: "Subtitle 1" },
  //   // { title: "Card 2", subtitle: "Subtitle 2" },
  //   // { title: "Card 3", subtitle: "Subtitle 3" },
  //   // { title: "Card 4", subtitle: "Subtitle 4" },
  //   // { title: "Card 5", subtitle: "Subtitle 5" },
  //   // { title: "Card 6", subtitle: "Subtitle 6" },
  //   // { title: "Card 7", subtitle: "Subtitle 7" },
  // ];

  const [cards, setCardsData] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   const resultado = dados
  //   .filter(item =>
  //     item.cooperatives.some(cooperative => cooperative.documentId === cooperativaSelecionada)
  //   )
  //   .map(item => item.client.documentId);

  // console.log(resultado);

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

        const resultadoDosIds = response.data
          .filter((item: { cooperatives: any[] }) =>
            item.cooperatives.some(
              (cooperative) =>
                cooperative.documentId === currentUser?.cooperative_id
            )
          )
          .map(
            (item: { client: { documentId: any } }) => item.client.documentId
          );
        console.log("listar os ids", resultadoDosIds);
        const getPevs = await getClients();
        console.log("all clients", getPevs);
        const resultado = buscarPorIds(resultadoDosIds, getPevs);
        console.log("listar os itens", resultado);

        setCardsData(resultado);
      } catch (error) {
        console.error("Erro ao buscar os Pevs:", error);
        return null;
      }
    };

    handleGetPevs();
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "9999",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "80%",
            height: "160px",
            display: "flex",
            flexDirection: "column",

            justifyContent: "space-between",
            maxWidth: "400px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "bold",
              }}
            >
              Filtrar dias da semana
            </Typography>
            <IconButton onClick={handleClose} size="medium">
              <CloseIcon />
            </IconButton>
          </div>

          {/* <WeekDayToggle /> */}

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", width: "100%", color: "white" }}
          >
            Aplicar filtro
          </Button>
        </Box>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <TextField
            style={{ marginRight: 10, flex: 1 }}
            label="Pesquisar"
            variant="outlined"
            size="small"
          />
          <IconButton
            size="medium"
            style={{ border: "1px solid #ccc", borderRadius: "4px" }}
            onClick={handleOpen}
          >
            <TuneIcon fontSize="inherit" />
          </IconButton>
        </div>

        {cards.map((card, index) => (
          <Card
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "95%",
              backgroundColor: " rgba(221, 195, 147, 0.2)",
              padding: "10px",
              gap: "8px",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography style={{ fontWeight: "600", fontSize: "16px" }}>
                {card.social_name}
              </Typography>
              <div
                style={{
                  border: "1px solid #ccc",
                  backgroundColor: "transparent",
                  padding: "1px 2px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                  justifyContent: "center",
                  height: "24px",
                }}
              >
                <CheckCircleIcon
                  style={{ fontSize: 14, marginRight: 10, color: "green" }}
                />
                <Typography style={{ fontSize: "14px" }}>Disponível</Typography>
              </div>
            </div>

            <Button
              variant="outlined"
              color="primary"
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                width: "100%",
              }}
              onClick={() => handleSelectedPevs(card)}
            >
              Coletar aqui
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
};
