import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { uploadImage } from "../../api/collection";
import Leaf from "../../assets/leaf";

const StyledImage = styled("img")({
  objectFit: "fill",
  objectPosition: "center",
  width: "100%",
  height: "150px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledImagePlaceholder = styled("div")({
  width: "100%",
  height: "150px",
  backgroundColor: "rgba(21, 133, 59, 0.08)",
  border: "2px dashed #15853B",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "4px",
});

export default function CollectionForm({
  selectedPEV,
  pevs,
}: {
  selectedPEV: any;
  pevs: any;
}) {
  // console.log("selected", selectedPEV);
  // console.log("pevs", pevs);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      collectionPoint: "",
      residuos: "",
      weight: "",
      hasAvaria: "",
      avariaDescription: "",
      coletorImage: null,
      avariaImage: null,
    },
  });

  const [coletorFile, setColetorFile] = useState<any>(null);
  const [avariaFile, setAvariaFile] = useState<any>(null);

  const [coletorImage, setColetorImage] = useState<any>(null);
  const [avariaImage, setAvariaImage] = useState<any>(null);

  const handleFileChangeColetor = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const previewUrl = URL.createObjectURL(selectedFile);
      setColetorImage(previewUrl);
      setColetorFile(selectedFile);
    }
  };

  const handleFileChangeAvaria = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const previewUrl = URL.createObjectURL(selectedFile);
      setAvariaImage(previewUrl);
      setAvariaFile(selectedFile);
    }
  };

  const onSubmit = async (data: any) => {
    // Verifica se o arquivo foi selecionado
    if (!coletorFile) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    try {
      const response = await uploadImage(coletorFile);

      if (response?.ok) {
        const data = await response.json();
        console.log("Upload bem-sucedido:", data);
        alert("Imagem carregada com sucesso!");
      } else {
        throw new Error("Falha no upload");
      }
    } catch (error) {
      throw new Error("Falha no upload");
    }

    if (!avariaFile) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    try {
      const response = await uploadImage(avariaFile);
      if (response?.ok) {
        const data = await response.json();
        console.log("Upload bem-sucedido:", data);
        alert("Imagem carregada com sucesso!");
      } else {
        throw new Error("Falha no upload");
      }
    } catch (error) {
      throw new Error("Falha no upload");
    }

    const { collectionPoint, residuos, weight, avariaDescription } = data;

    console.log("collectionPoint", collectionPoint);
    console.log("residuos", residuos);
    console.log("weight", weight);
    console.log("avariaDescription", avariaDescription);
    console.log("coletorImage", coletorImage);
    console.log("avariaImage", avariaImage);
  };

  const [collectionPoint, setCollectionPoint] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setCollectionPoint(event.target.value as string);
  };

  const [residuos, setResiduos] = React.useState("");
  const handleChangeResiduos = (event: SelectChangeEvent) => {
    setResiduos(event.target.value as string);
  };

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (selectedPEV) {
      setCollectionPoint(selectedPEV.id.toString());
    }
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "40px",
            width: "100%",
            marginBottom: "5px",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "row",
          }}
        >
          <Leaf />
          <Typography
            style={{ marginLeft: "10px", fontSize: "20px", fontWeight: "500" }}
          >
            Sobre a coleta
          </Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Controller
              name={"collectionPoint"}
              control={control}
              // rules={{ required }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="collectionPoint">Ponto de coleta</InputLabel>
                  <Select
                    labelId="collectionPoint"
                    id="Ponto de coleta"
                    value={collectionPoint}
                    label="Ponto de coleta"
                    onChange={handleChange}
                  >
                    {pevs.map(
                      (pev: {
                        adress_data: any;
                        id: string;
                        social_name: any;
                        street: any;
                        number: any;
                        neighborhood: any;
                      }) => (
                        <MenuItem value={pev.id}>
                          {`${pev.social_name} - ${pev.adress_data[0].street}, ${pev.adress_data[0].number} - ${pev.adress_data[0].neighborhood} `}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              )}
            />
          </div>

          <div>
            <Controller
              name={"residuos"}
              control={control}
              // rules={{ required }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="residuos">Tipo de residuos</InputLabel>
                  <Select
                    labelId="residuos"
                    id="Tipo de residuos"
                    value={residuos}
                    label="residuos"
                    onChange={handleChangeResiduos}
                  >
                    <MenuItem value={10}>Residuo 1</MenuItem>
                    <MenuItem value={20}>Residuo 2</MenuItem>
                    <MenuItem value={30}>Residuo 3</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: "40px",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Leaf />
          <Typography
            style={{ marginLeft: "10px", fontSize: "20px", fontWeight: "500" }}
          >
            Carregar fotos
          </Typography>
        </div>

        <div>
          <Typography style={{ fontSize: "14px", fontWeight: "400" }}>
            Coletor
          </Typography>
          {coletorImage ? (
            <StyledImage
              onClick={() =>
                document.getElementById("image-upload-coletor")?.click()
              }
              src={coletorImage}
              alt="Preview Coletor"
            />
          ) : (
            <StyledImagePlaceholder
              onClick={() =>
                document.getElementById("image-upload-coletor")?.click()
              }
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <AddAPhotoIcon
                  style={{
                    fontSize: 40,
                    color: "rgb(0, 0, 0, 0.35)",
                    alignSelf: "center",
                  }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "rgb(0, 0, 0, 0.35)", textAlign: "center" }}
                >
                  Toque para inserir foto do coletor
                </Typography>
              </div>
            </StyledImagePlaceholder>
          )}
          <input
            type="file"
            id="image-upload-coletor"
            name="file"
            onChange={handleFileChangeColetor}
            accept="image/*"
            style={{ display: "none" }}
          />

          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                style={{ marginTop: "10px" }}
                {...field}
                id="weight"
                type="text"
                placeholder="peso em kg"
                fullWidth
              />
            )}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Typography style={{ fontSize: "14px", fontWeight: "400" }}>
            Avaria
          </Typography>

          <Typography sx={{ fontWeight: "bold" }}>
            O seu coletor apresenta avarias (está danificado)?
          </Typography>

          <RadioGroup row value={selectedValue} onChange={handleChangeRadio}>
            <FormControlLabel value="yes" control={<Radio />} label="Sim" />
            <FormControlLabel value="no" control={<Radio />} label="Não" />
          </RadioGroup>

          {selectedValue === "yes" && (
            <>
              {avariaImage ? (
                <StyledImage src={avariaImage} alt="Preview Avaria" />
              ) : (
                <StyledImagePlaceholder
                  onClick={() =>
                    document.getElementById("image-upload-avaria")?.click()
                  }
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <AddAPhotoIcon
                      style={{
                        fontSize: 40,
                        color: "rgb(0, 0, 0, 0.35)",
                        alignSelf: "center",
                      }}
                    />
                    <Typography
                      variant="body1"
                      style={{
                        color: "rgb(0, 0, 0, 0.35)",
                        textAlign: "center",
                      }}
                    >
                      Toque para inserir foto da Avaria
                    </Typography>
                  </div>
                </StyledImagePlaceholder>
              )}
              <input
                type="file"
                id="image-upload-avaria"
                name="file"
                onChange={handleFileChangeAvaria}
                accept="image/*"
                style={{ display: "none" }}
              />
            </>
          )}
        </div>

        <Button
          style={{ marginTop: "20px", width: "100%", color: "white" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
