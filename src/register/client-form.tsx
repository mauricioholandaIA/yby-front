import { Button, Divider, OutlinedInput, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Box, styled } from "@mui/system";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { styled as styledComponents } from "styled-components";

const FormContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "24px",
});

const FormField = styled(Box)({
  flex: "1 1 calc(50% - 12px)",
  maxWidth: "250px",
});

const SubmitButton = styled(Button)({
  marginTop: "16px",
});

export default function ClientForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      cnpj: "",
      socialName: "",
      responsibleName: "",
      email: "",
      phone: "",
      username: "",
      password: "",
    },
  });

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

    console.log("Form data:", Object.fromEntries(formData));
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        dados basicos
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          {[
            {
              name: "socialName",
              label: "Razão Social",
              placeholder: "Razão Social",
              required: true,
            },
            {
              name: "cnpj",
              label: "CNPJ",
              placeholder: "Numero de MTR",
              required: true,
            },
            {
              name: "responsibleName",
              label: "Nome Responsavel",
              placeholder: "Nome do responsável",
              required: true,
            },
            {
              name: "email",
              label: "E-mail",
              placeholder: "E-mail",
              required: true,
            },
            {
              name: "phone",
              label: "Telefone",
              placeholder: "Telefone",
              required: true,
            },
            {
              name: "username",
              label: "Usuario",
              placeholder: "Nome de usuário",
              required: true,
            },
            {
              name: "password",
              label: "Senha de acesso",
              placeholder: "Senha",
              required: true,
              type: "password",
            },
          ].map(({ name, label, placeholder, required, type = "text" }) => (
            <FormField key={name}>
              <Typography
                variant="body1"
                component="label"
                htmlFor={name}
                fontWeight="bold"
              >
                {label}
              </Typography>
              <Controller
                name={
                  name as
                    | "email"
                    | "cnpj"
                    | "socialName"
                    | "responsibleName"
                    | "phone"
                    | "username"
                    | "password"
                }
                control={control}
                rules={{ required }}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    fullWidth
                  />
                )}
              />
            </FormField>
          ))}
        </FormContainer>

        <SubmitButton type="submit" variant="contained" color="primary">
          Submit
        </SubmitButton>
      </form>
    </div>
  );
}
