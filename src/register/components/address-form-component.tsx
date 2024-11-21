import { Box, FormHelperText, styled, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

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

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CepMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00000-000"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export const AddressFormComponent = ({ control }: { control: any }) => {
  return (
    <div>
      <FormContainer>
        <FormField size={"300px"} key={"client_cep"}>
          <Controller
            name={"client_cep"}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  id={"client_cep"}
                  label="CEP"
                  required={true}
                  placeholder={"CEP"}
                  type="outlined"
                  slotProps={{
                    input: {
                      inputComponent: CepMaskCustom as any,
                    },
                  }}
                  size="small"
                  autoComplete="off"
                  error={fieldState.error ? true : false}
                  variant="outlined"
                  fullWidth
                />
                {fieldState.error && (
                  <FormHelperText style={{ color: "red" }}>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormField>

        <FormField size={"390px"} key={"client_street"}>
          <Controller
            name={"client_street"}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  id={"client_street"}
                  type="outlined"
                  placeholder={"Rua"}
                  required={true}
                  fullWidth
                  label={"Rua"}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  error={fieldState.error ? true : false}
                />
                {fieldState.error && (
                  <FormHelperText style={{ color: "red" }}>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormField>

        <FormField size={"200px"} key={"client_street_number"}>
          <Controller
            name={"client_street_number"}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  id={"client_street_number"}
                  type="number"
                  placeholder={"Número"}
                  required={true}
                  fullWidth
                  label={"Número"}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  error={fieldState.error ? true : false}
                />
                {fieldState.error && (
                  <FormHelperText style={{ color: "red" }}>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormField>

        <FormField size={"250px"} key={"client_neighborhood"}>
          <Controller
            name={"client_neighborhood"}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  id={"client_neighborhood"}
                  type="outlined"
                  placeholder={"Bairro"}
                  required={true}
                  fullWidth
                  label={"Bairro"}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  error={fieldState.error ? true : false}
                />
                {fieldState.error && (
                  <FormHelperText style={{ color: "red" }}>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormField>

        <FormField size={"300px"} key={"client_state"}>
          <Controller
            name={"client_state"}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  id={"client_state"}
                  type="outlined"
                  placeholder={"Estado"}
                  required={true}
                  fullWidth
                  label={"Estado"}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  error={fieldState.error ? true : false}
                />
                {fieldState.error && (
                  <FormHelperText style={{ color: "red" }}>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormField>

        <FormField size={"390px"} key={"client_city"}>
          <Controller
            name={"client_city"}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  id={"client_city"}
                  type="outlined"
                  placeholder={"Cidade"}
                  required={true}
                  fullWidth
                  label={"Cidade"}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  error={fieldState.error ? true : false}
                />
                {fieldState.error && (
                  <FormHelperText style={{ color: "red" }}>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormField>
      </FormContainer>
    </div>
  );
};
