import { Visibility, VisibilityOff } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
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

export default function CooperativeForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      cooperative_name: "",
      cooperative_code: "",
    },
  });

  const onSubmit = async (data: any) => {
    // const formData = new FormData();

    // // Add all form fields to formData
    // Object.entries(data).forEach(([key, value]) => {
    //   if (typeof value === "string" || value instanceof Blob) {
    //     formData.append(key, value);
    //   } else if (value !== null && value !== undefined) {
    //     formData.append(key, String(value));
    //   }
    // });

    // console.log("Form data:", Object.fromEntries(formData));

    console.log("Form data:", data);

    const cooperative = await createCooperative({
      cooperative_name: data.cooperative_name,
      cooperative_code: data.cooperative_code,
    });

    console.log(cooperative);
  };

  const formFields = {
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
        copy: true,
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormContainer>
            {formFields.fields.map(
              ({ name, label, placeholder, required, copy }) => (
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
                        slotProps={{
                          input: {
                            endAdornment: (
                              <>
                                {copy && (
                                  <ContentCopyIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        field.value
                                      );
                                      field.onChange(field.value);
                                      field.onBlur();
                                      alert("Cópiado para a área");
                                    }}
                                  />
                                )}
                              </>
                            ),
                          },
                        }}
                      />

                      //   <ContentCopyIcon
                      //     onClick={() => {
                      //       navigator.clipboard.writeText(field.value);
                      //       field.onChange(field.value);
                      //       field.onBlur();
                      //       alert("Cópiado para a área");
                      //     }}
                      //   />
                      // </>
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
