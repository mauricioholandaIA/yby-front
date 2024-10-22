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
import { Box, styled } from "@mui/system";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

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
});

const FormField = styled(Box)<{ size?: string }>`
  max-width: ${(props) => props.size || "390px"};
  min-width: 200px;
  flex-grow: 1;
`;

export default function CollectionForm() {
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

  const [coletorPreviewUrl, setColetorPreviewUrl] = useState<string | null>(
    null
  );
  const [avariaPreviewUrl, setAvariaPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      if (fieldName === "coletorImage") {
        setColetorPreviewUrl(previewUrl);
      } else {
        setAvariaPreviewUrl(previewUrl);
      }
    }
  };

  const fetchAndConvertToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Add all form fields to formData
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "string" || value instanceof Blob) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (coletorPreviewUrl) {
      const coletorBase64 = await fetchAndConvertToBase64(coletorPreviewUrl);
      formData.append("coletorImage", coletorBase64);
    }

    if (avariaPreviewUrl) {
      const avariaBase64 = await fetchAndConvertToBase64(avariaPreviewUrl);
      formData.append("avariaImage", avariaBase64);
    }

    console.log("Form data:", Object.fromEntries(formData));
    // Here you can send the formData to your server

    // Example of how you might send this data to a server
    // fetch('/api/submit-form', {
    //   method: 'POST',
    //   body: formData
    // }).then(response => response.json())
    //   .then(result => {
    //     console.log('Success:', result);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  };

  const [collectionPoint, setCollectionPoint] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCollectionPoint(event.target.value as string);
  };

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        marginTop: "20px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "40px",
          width: "100%",
          marginBottom: "5px",
          backgroundColor: " rgba(221, 195, 147, 0.2)",
          alignItems: "center",
          justifyContent: "start",
          borderRadius: "5px",
          maxWidth: "390px",
        }}
      >
        <Typography
          style={{ marginLeft: "10px", fontSize: "20px", fontWeight: "500" }}
        >
          Sobre a coleta
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <FormField key={"collectionPoint"}>
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
                    <MenuItem value={10}>Ponto 1</MenuItem>
                    <MenuItem value={20}>Ponto 2</MenuItem>
                    <MenuItem value={30}>Ponto 3</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </FormField>

          <FormField key={"residuos"}>
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
                    value={collectionPoint}
                    label="residuos"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ponto 1</MenuItem>
                    <MenuItem value={20}>Ponto 2</MenuItem>
                    <MenuItem value={30}>Ponto 3</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </FormField>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            height: "40px",
            width: "100%",
            marginBottom: "5px",
            backgroundColor: " rgba(221, 195, 147, 0.2)",
            alignItems: "center",
            justifyContent: "start",
            borderRadius: "5px",
            maxWidth: "390px",
          }}
        >
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
          {coletorPreviewUrl ? (
            <StyledImage src={coletorPreviewUrl} alt="Preview Coletor" />
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
            id="image-upload-coletor"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "coletorImage")}
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
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          {selectedValue === "yes" && (
            <>
              {avariaPreviewUrl ? (
                <StyledImage src={avariaPreviewUrl} alt="Preview Avaria" />
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
                id="image-upload-avaria"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "avariaImage")}
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
