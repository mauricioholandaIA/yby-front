import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";

import { styled as styledComponents } from "styled-components";

const StyledCenteredContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 2rem 0;
`;

const StyledFlexRowContent = styledComponents.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  
`;

const StyledFlexColumnContent = styledComponents.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 300px;
 
`;

const StyledItem = styledComponents.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border:   1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StyledImageContainer = styledComponents.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`;

const StyledImageArea = styledComponents.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 0.5rem);
`;

export default function CollectionPoint() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewUrlAvaria, setPreviewUrlAvaria] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageChangeAvaria = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setPreviewUrlAvaria(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <StyledContainer>
      <StyledCenteredContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          Ponto de Coleta
        </Typography>

        <StyledFlexRowContent>
          <StyledFlexColumnContent>
            <FormLabel htmlFor="first-name" required>
              Seu ponto de coleta
            </FormLabel>
            <OutlinedInput
              id="collection-point"
              name="collection-point"
              type="collection-point"
              placeholder="SELECT"
              size="small"
            />

            <FormLabel htmlFor="last-name" required>
              MTR
            </FormLabel>
            <OutlinedInput
              id="mtr"
              name="mtr"
              type="mtr"
              placeholder="Numero de MTR"
              required
              size="small"
            />

            <FormLabel htmlFor="address1" required>
              Residuos
            </FormLabel>
            <OutlinedInput
              id="address1"
              name="address1"
              type="address1"
              placeholder="Street name and number"
              autoComplete="shipping address-line1"
              required
              size="small"
            />
          </StyledFlexColumnContent>

          <StyledFlexColumnContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Imagens
            </Typography>
            <StyledImageContainer>
              <StyledImageArea>
                <FormLabel htmlFor="image-upload-coletor" required>
                  Coletor
                </FormLabel>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview Coletor"
                    style={{
                      marginTop: "10px",
                      maxWidth: "100%",
                      maxHeight: "200px",
                    }}
                  />
                )}
                <input
                  id="image-upload-coletor"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                  style={{ display: "none" }}
                />
                <OutlinedInput
                  type="button"
                  onClick={() =>
                    document.getElementById("image-upload-coletor")?.click()
                  }
                  value="Choose Image"
                  size="small"
                />

                <OutlinedInput
                  id="weight"
                  name="weight"
                  type="weight"
                  placeholder="peso em kg"
                  size="small"
                />
              </StyledImageArea>

              <StyledImageArea>
                <FormLabel htmlFor="image-upload-avaria" required>
                  Avaria (s)
                </FormLabel>
                <FormControl>
                  <FormLabel id="avaria-buttons-group-label">
                    O PEV visitado possui avarias?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="avaria-group-label"
                    name="avaria-buttons-group"
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
                </FormControl>
                {previewUrlAvaria && (
                  <img
                    src={previewUrlAvaria}
                    alt="Preview Avaria"
                    style={{
                      marginTop: "10px",
                      maxWidth: "100%",
                      maxHeight: "200px",
                    }}
                  />
                )}
                <input
                  id="image-upload-avaria"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChangeAvaria(e)}
                  style={{ display: "none" }}
                />
                <OutlinedInput
                  type="button"
                  onClick={() =>
                    document.getElementById("image-upload-avaria")?.click()
                  }
                  value="Choose Image"
                  size="small"
                />
                <OutlinedInput
                  id="avaria"
                  name="avaria"
                  type="avaria"
                  placeholder="Descreva a avaria"
                  size="small"
                />
              </StyledImageArea>
            </StyledImageContainer>
          </StyledFlexColumnContent>
        </StyledFlexRowContent>
      </StyledCenteredContainer>
    </StyledContainer>
  );
}
