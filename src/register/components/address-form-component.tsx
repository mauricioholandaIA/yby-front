import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, styled, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import WeekDayToggle from "./WeekDayToggle";

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

  const [weekDays, setWeekDays] = useState<string[]>([]); // Estado para os dias selecionados

  const handleWeekDaysChange = (days: string[]) => {
    setWeekDays(days);
  };

  return (
    <div>
      <FormContainer>
        {formFields.fields.map(
          ({ name, label, placeholder, required, size, type = "outlined" }) => (
            <FormField size={size} key={name}>
              <Controller
                name={`addresses[${index}].${name}`} // Atualiza o caminho para cada endereço
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
                    focused
                    autoComplete="off"
                  />
                )}
              />
            </FormField>
          )
        )}
        <Controller
          name={`addresses[${index}].weekDays`} // Conectar o WeekDayToggle com o estado do formulário
          control={control}
          render={({ field }) => (
            <WeekDayToggle
              onChange={field.onChange} // Atualiza o estado no React Hook Form
              selectedDays={field.value || []} // Passa os dias selecionados
            />
          )}
        />
      </FormContainer>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginRight: "10px", color: "green" }}
        onClick={() => remove(index)} // Remove o endereço atual
      >
        <DeleteIcon style={{ marginRight: "5px" }} />
        Excluir Endereço
      </Button>
    </div>
  );
};
