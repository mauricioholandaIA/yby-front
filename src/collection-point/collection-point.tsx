import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { styled as styledComponents } from "styled-components";

const StyledContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 2rem 0;
`;

const StyledCenteredContainer = styledComponents.div`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
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

const FormField = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiTypography-root": {
    marginBottom: theme.spacing(1),
  },
}));
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

export default function CollectionPoint() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      collectionPoint: "",
      mtr: "",
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

  return (
    <StyledContainer>
      <StyledCenteredContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          Ponto de Coleta
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField>
                <Typography
                  variant="body1"
                  component="label"
                  htmlFor="collection-point"
                  fontWeight="bold"
                >
                  Seu ponto de coleta
                </Typography>
                <Controller
                  name="collectionPoint"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="collection-point"
                      type="text"
                      placeholder="SELECT"
                      fullWidth
                    />
                  )}
                />
              </FormField>
              <FormField>
                <Typography
                  variant="body1"
                  component="label"
                  htmlFor="mtr"
                  fontWeight="bold"
                >
                  MTR
                </Typography>
                <Controller
                  name="mtr"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="mtr"
                      type="text"
                      placeholder="Numero de MTR"
                      required
                      fullWidth
                    />
                  )}
                />
              </FormField>
              <FormField>
                <Typography
                  variant="body1"
                  component="label"
                  htmlFor="residuos"
                  fontWeight="bold"
                >
                  Residuos
                </Typography>
                <Controller
                  name="residuos"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="residuos"
                      type="text"
                      placeholder="Tipo de residuos"
                      required
                      fullWidth
                    />
                  )}
                />
              </FormField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Imagens
              </Typography>
              <Grid container justifyContent={"space-between"} spacing={1}>
                <Grid size={{ xs: 12, md: 6 }}>
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
                      <StyledColetorImage
                        src={coletorPreviewUrl}
                        alt="Preview Coletor"
                      />
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
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
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
                          <RadioGroup
                            {...field}
                            row
                            aria-labelledby="avaria-group-label"
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Sim"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        )}
                      />
                    </FormControl>
                    {avariaPreviewUrl ? (
                      <StyledImage
                        src={avariaPreviewUrl}
                        alt="Preview Avaria"
                      />
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
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </StyledCenteredContainer>
    </StyledContainer>
  );
}
