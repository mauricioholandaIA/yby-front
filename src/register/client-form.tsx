import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { createClient } from "../api/client";
import { AddressFormComponent } from "./components/address-form-component";

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

interface Address {
  cep: string;
  rua: string;
  numeroRua: string;
  bairro: string;
  estado: string;
  cidade: string;
  // weekDays: string[];
}

interface ClientFormData {
  client_cnpj: string;
  client_socialName: string;
  client_responsibleName: string;
  client_email: string;
  client_phone: string;
  client_username: string;
  client_password: string;
  addresses: Address[]; // Define o tipo para o array de endereços
}

export default function ClientForm() {
  const { control, handleSubmit } = useForm<ClientFormData>({
    defaultValues: {
      client_cnpj: "",
      client_socialName: "",
      client_responsibleName: "",
      client_email: "",
      client_phone: "",
      client_username: "",
      client_password: "",
      addresses: [], // Inicializa como um array vazio
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit = async (data: ClientFormData) => {
    console.log("Form data:", data);

    // const formData = new FormData();

    // Object.entries(data).forEach(([key, value]) => {
    //   if (typeof value === "string" || value instanceof Blob) {
    //     formData.append(key, value);
    //   } else if (Array.isArray(value)) {
    //     formData.append(key, JSON.stringify(value));
    //   } else if (value !== null && value !== undefined) {
    //     formData.append(key, String(value));
    //   }
    // });

    // console.log("Form data processed:", data);

    const createdClient = await createClient({
      cnpj: data.client_cnpj,
      social_name: data.client_socialName,
      responsible_name: data.client_responsibleName,
      email: data.client_email,
      phone: data.client_phone,
      password: data.client_password,

      adress_data: {
        street: data.addresses[0].rua,
        number: data.addresses[0].numeroRua,
        neighborhood: data.addresses[0].bairro,
        city: data.addresses[0].cidade,
        state: data.addresses[0].estado,
        cep: data.addresses[0].cep,
      },
    });
  };

  const formFields = {
    section: "Dados básicos",
    fields: [
      {
        name: "client_socialName",
        label: "Razão Social",
        placeholder: "Razão Social",
        required: true,
      },
      {
        name: "client_cnpj",
        label: "CNPJ",
        placeholder: "Número de CNPJ",
        required: true,
      },
      {
        name: "client_responsibleName",
        label: "Nome do Responsável",
        placeholder: "Nome do responsável",
        required: true,
      },
      {
        name: "client_email",
        label: "E-mail",
        placeholder: "E-mail",
        required: true,
      },
      {
        name: "client_phone",
        label: "Telefone",
        placeholder: "Telefone",
        required: true,
      },
      {
        name: "client_username",
        label: "Usuário",
        placeholder: "Nome de usuário",
        required: true,
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography fontSize={20} marginTop={"16px"}>
          Dados básicos
        </Typography>
        <Divider />
        <FormContainer>
          {formFields.fields.map(
            ({ name, label, placeholder, required, type = "outlined" }) => (
              <FormField key={name}>
                <Controller
                  name={name as any}
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
                      // focused
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
        <div>
          {/* {fields.map((field, index) => ( */}
          <AddressFormComponent
            key={"AddressFormComponent"}
            control={control}
            index={0}
            remove={remove}
          />
          {/* ))} */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
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
