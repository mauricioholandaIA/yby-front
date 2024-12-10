import { yupResolver } from "@hookform/resolvers/yup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { createCooperative } from "../api/cooperative";

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

const schema = yup.object().shape({
  cooperative_name: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Pelo menos 6 digitos"),
  cooperative_code: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Pelo menos 6 digitos")
    .matches(/^[a-z]+$/, "Apenas letras minúsculas"),
  cooperative_employees: yup
    .number()
    .required("Campo obrigatório")
    .min(1, "Pelo menos 1 funcionário"),
});

export default function CooperativeForm() {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      cooperative_name: "",
      cooperative_code: "",
      cooperative_employees: 1,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await createCooperative({
        cooperative_name: data.cooperative_name,
        cooperative_code: data.cooperative_code,
        cooperative_employees: data.cooperative_employees,
      });

      if (!response) {
        setLoading(false);
        console.error("Error creating cooperative", response);
        alert("Erro ao criar cooperativa");
        reset();
        return;
      } else {
        setLoading(false);
        console.log("Cooperativa criada com sucesso!", response);
        alert("Cooperativa criada com sucesso!");
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating cooperative:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          fontSize={20}
          marginTop={"16px"}
          color="#4B3838"
          fontWeight={"500"}
          gutterBottom
        >
          Dados básicos
        </Typography>
        <Divider style={{ backgroundColor: "#4B3838" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormContainer>
            <FormField size="390px" key={"cooperative_name"}>
              <Controller
                name={"cooperative_name"}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      id={"cooperative_name"}
                      type="outlined"
                      placeholder={"Nome da Cooperativa"}
                      required={true}
                      fullWidth
                      label={"Nome da Cooperativa"}
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

            <FormField size="390px" key={"cooperative_code"}>
              <Controller
                name={"cooperative_code"}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      id={"cooperative_code"}
                      type="outlined"
                      placeholder={"Código de acesso"}
                      required={true}
                      fullWidth
                      label={"Código de acesso"}
                      variant="outlined"
                      size="small"
                      autoComplete="off"
                      error={fieldState.error ? true : false}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <>
                              <ContentCopyIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  navigator.clipboard.writeText(field.value);
                                  field.onChange(field.value);
                                  field.onBlur();
                                  alert("Cópiado para a área");
                                }}
                              />
                            </>
                          ),
                        },
                      }}
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

            <FormField size="390px" key={"cooperative_employees"}>
              <Controller
                name={"cooperative_employees"}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      id={"cooperative_employees"}
                      type="number"
                      placeholder={"Número de colaboradores"}
                      required={true}
                      fullWidth
                      label={"Número de colaboradores"}
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
          <div style={{ alignContent: "center" }}>
            <Button
              disabled={loading}
              style={{ color: "#ffff" }}
              type="submit"
              variant="contained"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Cadastrar"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
