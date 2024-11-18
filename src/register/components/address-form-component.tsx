import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, styled, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
// import WeekDayToggle from "./WeekDayToggle";

const FormContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "24px",
  marginTop: "16px",
  marginBottom: "16px",
});

const FormField = styled(Box)<{ size?: string }>`
  width: 30%;
  max-width: ${(props) => props.size || "390px"};
  min-width: 200px;
  flex-grow: 1;
`;

export const AddressFormComponent = ({
  control,
  index,
  remove,
}: {
  control: any;
  index: number;
  remove: (index: number) => void;
}) => {
  const formFields = {
    section: "Endereço",
    fields: [
      {
        name: "cep",
        label: "CEP",
        placeholder: "CEP",
        required: true,
        size: "300px",
      },
      {
        name: "rua",
        label: "Rua",
        placeholder: "Nome da rua",
        required: true,
        size: "390px",
      },
      {
        name: "numeroRua",
        label: "Nº",
        placeholder: "Número",
        required: true,
        size: "200px",
      },
      {
        name: "bairro",
        label: "Bairro",
        placeholder: "Bairro",
        required: true,
        size: "250px",
      },
      {
        name: "estado",
        label: "Estado",
        placeholder: "Estado",
        required: true,
        size: "300px",
      },
      {
        name: "cidade",
        label: "Cidade",
        placeholder: "Cidade",
        required: true,
        size: "390px",
        type: "outlined",
      },
    ],
  };

  return (
    <div>
      <FormContainer>
        {formFields.fields.map(
          ({ name, label, placeholder, required, size, type = "outlined" }) => (
            <FormField size={size} key={name}>
              <Controller
                name={`addresses[${index}].${name}`}
                control={control}
                rules={{ required }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id={`${name}-${index}`}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    fullWidth
                    label={label}
                    variant="outlined"
                    size="small"
                    // focused
                    autoComplete="off"
                  />
                )}
              />
            </FormField>
          )
        )}
      </FormContainer>
    </div>
  );
};
