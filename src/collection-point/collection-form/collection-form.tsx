import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createCollection, uploadImage } from "../../api/collection";
import Leaf from "../../assets/leaf";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const schema = yup.object().shape({
  collectionPoint: yup.string().required("Ponto de coleta é obrigatório"),
  residuos: yup.string().required("Tipo de residuos é obrigatório"),
  weight: yup.string().required("Peso é obrigatório"),
  // hasAvaria: yup.string().required("Avaria é obrigatório"),

  coletorImage: yup.mixed().required("Foto do coletor é obrigatória"),
  // avariaImage: yup.mixed().required("Foto do coletor é obrigatória"),
  avariaImage: yup.mixed(),
});

export default function CollectionForm({
  selectedPEV,
  pevs,
}: {
  selectedPEV: any;
  pevs: any;
}) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      collectionPoint: selectedPEV?.id?.toString() || "",
      residuos: "",
      weight: "0",
      // hasAvaria: "",
      // avariaDescription: "",
      coletorImage: "",
      avariaImage: "",
    },
    resolver: yupResolver(schema),
  });

  const [coletorFile, setColetorFile] = useState<any>(null);
  const [avariaFile, setAvariaFile] = useState<any>(null);

  const [coletorImage, setColetorImage] = useState<any>(null);
  const [avariaImage, setAvariaImage] = useState<any>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: (url: string) => void,
    setFile: (file: File) => void
  ) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const previewUrl = URL.createObjectURL(selectedFile);
      setImage(previewUrl);
      setFile(selectedFile);
    }
  };

  const onSubmit = async (data: any) => {
    console.log("data", data);

    try {
      let responseUploadImage;
      let responseAvariaImage = null;

      try {
        responseUploadImage = await uploadImage(coletorFile);
      } catch (error) {
        console.error("Erro ao fazer upload da foto do coletor:", error);
        responseUploadImage = null;
      }

      if (avariaFile) {
        try {
          responseAvariaImage = await uploadImage(avariaFile);
        } catch (error) {
          console.error("Erro ao fazer upload da foto da avaria:", error);
        }
      }

      const { weight, collectionPoint, residuos } = data;

      const formatData = {
        waste: residuos,
        weight,
        client: {
          id: collectionPoint,
        },
        colector: responseUploadImage
          ? { id: responseUploadImage[0].id }
          : null,
        avaria: responseAvariaImage ? { id: responseAvariaImage[0].id } : null,
      };

      const response = await createCollection(formatData);

      if (!responseUploadImage) {
        alert("Não foi possível fazer o upload da foto do coletor.");
      }

      if (avariaFile && !responseAvariaImage) {
        alert("Não foi possível fazer o upload da foto da avaria.");
      }

      return response;
    } catch (error) {
      throw new Error("Falha no upload");
    }
  };

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

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
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <InputLabel id="collectionPoint">Ponto de coleta</InputLabel>
                  <Select
                    error={fieldState.error ? true : false}
                    {...field}
                    labelId="collectionPoint"
                    id="Ponto de coleta"
                    label="Ponto de coleta"
                  >
                    {pevs.map(
                      (pev: {
                        adress_data: any;
                        id: string;
                        social_name: any;
                        street: any;
                        number: any;
                        neighborhood: any;
                        documentId: any;
                      }) => (
                        <MenuItem value={pev.id}>
                          {`${pev.social_name} - ${pev.adress_data[0].street}, ${pev.adress_data[0].number} - ${pev.adress_data[0].neighborhood} `}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {fieldState.error && (
                    <FormHelperText style={{ color: "red" }}>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </div>

          <div>
            <Controller
              name={"residuos"}
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <InputLabel id="residuos">Tipo de residuos</InputLabel>
                  <Select
                    error={fieldState.error ? true : false}
                    {...field}
                    labelId="residuos"
                    id="Tipo de residuos"
                    label="residuos"
                  >
                    <MenuItem value={10}>Residuo 1</MenuItem>
                    <MenuItem value={20}>Residuo 2</MenuItem>
                    <MenuItem value={30}>Residuo 3</MenuItem>
                  </Select>
                  {fieldState.error && (
                    <FormHelperText style={{ color: "red" }}>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
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
            onChange={(event) =>
              handleFileChange(event, setColetorImage, setColetorFile)
            }
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
                onChange={(event) =>
                  handleFileChange(event, setAvariaImage, setAvariaFile)
                }
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
