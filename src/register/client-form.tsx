import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Controller, useForm } from "react-hook-form";

const FormContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "24px",
  marginTop: "16px",
  marginBottom: "16px",
});

const FormField = styled(Box)({
  width: "30%",
  maxWidth: "390px",
  minWidth: "200px",
  flexGrow: 1,
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
      cep: "",
      rua: "",
      numero: "",
      numeroRua: "",
      bairro: "",
      estado: "",
      cidade: "",
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

  const formFields = [
    {
      section: "Dados básicos",
      fields: [
        {
          name: "socialName",
          label: "Razão Social",
          placeholder: "Razão Social",
          required: true,
        },
        {
          name: "cnpj",
          label: "CNPJ",
          placeholder: "Número de CNPJ",
          required: true,
        },
        {
          name: "responsibleName",
          label: "Nome do Responsável",
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
          label: "Usuário",
          placeholder: "Nome de usuário",
          required: true,
        },
        {
          name: "password",
          label: "Senha de acesso",
          placeholder: "Senha",
          type: "password",
          required: true,
        },
      ],
    },
    {
      section: "Endereço",
      fields: [
        { name: "cep", label: "CEP", placeholder: "CEP", required: true },
        {
          name: "rua",
          label: "Rua",
          placeholder: "Nome da rua",
          required: true,
        },
        {
          name: "numeroRua",
          label: "Nº",
          placeholder: "Número",
          required: true,
        },
        {
          name: "bairro",
          label: "Bairro",
          placeholder: "Bairro",
          required: true,
        },
        {
          name: "estado",
          label: "Estado",
          placeholder: "Estado",
          required: true,
        },
        {
          name: "cidade",
          label: "Cidade",
          placeholder: "Cidade",
          required: true,
        },
      ],
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography fontSize={20} marginTop={"16px"}>
          Dados básicos
        </Typography>
        <Divider />

        <FormContainer>
          {formFields[0].fields.map(
            ({ name, label, placeholder, required, type = "outlined" }) => (
              <FormField key={name}>
                <Controller
                  name={
                    name as
                      | "cnpj"
                      | "socialName"
                      | "responsibleName"
                      | "email"
                      | "phone"
                      | "username"
                      | "password"
                  }
                  control={control}
                  rules={{ required }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id={name}
                      type={type}
                      placeholder={placeholder}
                      required={required}
                      fullWidth
                      label={label}
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </FormField>
            )
          )}
        </FormContainer>

        <Typography fontSize={20} gutterBottom>
          Endereço
        </Typography>

        <Divider />

        <FormContainer>
          {formFields[1].fields.map(
            ({ name, label, placeholder, required, type = "outlined" }) => (
              <FormField key={name}>
                <Controller
                  name={
                    name as
                      | "cep"
                      | "rua"
                      | "numero"
                      | "numeroRua"
                      | "bairro"
                      | "estado"
                      | "cidade"
                  }
                  control={control}
                  rules={{ required }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id={name}
                      type={type}
                      placeholder={placeholder}
                      required={required}
                      fullWidth
                      label={label}
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </FormField>
            )
          )}
        </FormContainer>

        <SubmitButton type="submit" variant="contained" color="primary">
          Submit
        </SubmitButton>
      </form>
    </div>
  );
}
