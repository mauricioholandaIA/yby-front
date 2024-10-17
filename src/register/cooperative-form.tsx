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

const FormField = styled(Box)<{ size?: string }>`
  width: 30%;
  max-width: ${(props) => props.size || "390px"};
  min-width: 200px;
  flex-grow: 1;
`;

export default function CooperativeForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      cooperative_name: "",
      cooperative_code: "",
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
          name: "cooperative_name",
          label: "Nome da Cooperativa",
          placeholder: "Nome da Cooperativa",
          required: true,
          size: "390px",
        },
        {
          name: "cooperative_code",
          label: "Código de acesso",
          placeholder: "Código de acesso",
          required: true,
          size: "390px",
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormContainer>
            {formFields[0].fields.map(
              ({ name, label, placeholder, required }) => (
                <FormField key={name}>
                  <Controller
                    name={name as "cooperative_name" | "cooperative_code"}
                    control={control}
                    rules={{ required }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id={name}
                        type={"outlined"}
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
          <div style={{ alignContent: "center" }}>
            <Button
              style={{ color: "#ffff" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
