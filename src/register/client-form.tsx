import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import WeekDayToggle from "./components/WeekDayToggle";

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
          name: "client_socialName",
          label: "Razão Social",
          placeholder: "Razão Social",
          required: true,
          size: "390px",
        },
        {
          name: "client_cnpj",
          label: "CNPJ",
          placeholder: "Número de CNPJ",
          required: true,
          size: "390px",
        },
        {
          name: "client_responsibleName",
          label: "Nome do Responsável",
          placeholder: "Nome do responsável",
          required: true,
          size: "390px",
        },
        {
          name: "client_email",
          label: "E-mail",
          placeholder: "E-mail",
          required: true,
          size: "390px",
        },
        {
          name: "client_phone",
          label: "Telefone",
          placeholder: "Telefone",
          required: true,
          size: "390px",
        },
        {
          name: "client_username",
          label: "Usuário",
          placeholder: "Nome de usuário",
          required: true,
          size: "390px",
        },
        {
          name: "client_password",
          label: "Senha de acesso",
          placeholder: "Senha",
          type: "password",
          required: true,
          size: "390px",
        },
      ],
    },
    {
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
    },
  ];

  const [addressForms, setAddressForms] = React.useState([{}]);

  const handleAddAddressForm = () => {
    setAddressForms([...addressForms, {}]);
  };

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
                      focused
                      autoComplete="off"
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
        {addressForms.map((addressForm, index) => (
          <div key={index}>
            <FormContainer>
              {formFields[1].fields.map(
                ({
                  name,
                  label,
                  placeholder,
                  required,
                  size,
                  type = "outlined",
                }) => (
                  <FormField size={size} key={name}>
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
                          focused
                          autoComplete="off"
                        />
                      )}
                    />
                  </FormField>
                )
              )}
              <WeekDayToggle />
            </FormContainer>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: "10px", color: "green" }}
            onClick={handleAddAddressForm}
          >
            + Adicionar Endereço
          </Button>
          <Button
            style={{ color: "#ffff" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
