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
import { styled as styledComponents } from "styled-components";

const StyledCenteredContainer = styledComponents.div`
      width: 80%;
      max-width: 1200px;
    `;

const StyledImageArea = styledComponents.div`
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `;

const StyledImage = styled("img")({
  marginTop: "10px",
  width: "222px",
  height: "200px",
  objectFit: "fill",
  objectPosition: "center",
});

const FormField = styled(Box)<{ size?: string }>`
  width: 30%;
  max-width: ${(props) => props.size || "390px"};
  min-width: 200px;
  flex-grow: 1;
`;

const FormContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "24px",
  marginTop: "16px",
  marginBottom: "16px",
});

const StyledImagePlaceholder = styled("div")({
  marginTop: "10px",
  width: "100%",
  height: "200px",
  backgroundColor: "#e0e0e0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledColetorImage = styled("img")({
  marginTop: "10px",
  width: "222px",
  height: "282px", // Increased height
  objectFit: "fill",
  objectPosition: "center",
});

const StyledColetorImagePlaceholder = styled("div")({
  marginTop: "10px",
  width: "100%",
  height: "282px", // Increased height
  backgroundColor: "#e0e0e0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function PEVSForm() {
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

  return (
    <StyledCenteredContainer>
      <Typography variant="h6" component="h2" gutterBottom>
        Sobre a coleta
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
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
                  <InputLabel id="residuos">Ponto de coleta</InputLabel>
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
        </FormContainer>

        <Typography variant="h6" component="h2" gutterBottom>
          Fotos da coleta
        </Typography>

        <StyledImageArea>
          <Typography
            variant="body1"
            component="label"
            htmlFor="image-upload-coletor"
            sx={{ fontWeight: "bold" }}
          >
            Coletor
          </Typography>
          {coletorPreviewUrl ? (
            <StyledColetorImage src={coletorPreviewUrl} alt="Preview Coletor" />
          ) : (
            <StyledColetorImagePlaceholder>
              <Typography variant="body2" color="textSecondary">
                No image selected
              </Typography>
            </StyledColetorImagePlaceholder>
          )}
          <input
            id="image-upload-coletor"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "coletorImage")}
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            onClick={() =>
              document.getElementById("image-upload-coletor")?.click()
            }
          >
            Choose Image
          </Button>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                id="weight"
                type="text"
                placeholder="peso em kg"
                fullWidth
              />
            )}
          />
        </StyledImageArea>

        <StyledImageArea>
          <Typography
            variant="body1"
            component="label"
            htmlFor="image-upload-avaria"
            sx={{ fontWeight: "bold" }}
          >
            Avaria (s)
          </Typography>
          <FormControl>
            <Typography
              variant="body1"
              component="label"
              id="avaria-buttons-group-label"
              sx={{ fontWeight: "bold" }}
            >
              O PEV visitado possui avarias?
            </Typography>
            <Controller
              name="hasAvaria"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row aria-labelledby="avaria-group-label">
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              )}
            />
          </FormControl>
          {avariaPreviewUrl ? (
            <StyledImage src={avariaPreviewUrl} alt="Preview Avaria" />
          ) : (
            <StyledImagePlaceholder>
              <Typography variant="body2" color="textSecondary">
                No image selected
              </Typography>
            </StyledImagePlaceholder>
          )}
          <input
            id="image-upload-avaria"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "avariaImage")}
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            onClick={() =>
              document.getElementById("image-upload-avaria")?.click()
            }
          >
            Choose Image
          </Button>
          <Controller
            name="avariaDescription"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                id="avaria"
                type="text"
                placeholder="Descreva a avaria"
                fullWidth
              />
            )}
          />
        </StyledImageArea>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </StyledCenteredContainer>
  );
}
