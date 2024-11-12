import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { editPlanning } from "../../api/planning";

const PevForm = ({ title = "", cooperatives, pev }: any) => {
  const columns = ["seg", "ter", "qua", "qui", "sex"];

  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: pev.id,
      seg: pev?.seg?.value || [],
      ter: pev?.ter?.value || [],
      qua: pev?.qua?.value || [],
      qui: pev?.qui?.value || [],
      sex: pev?.sex?.value || [],
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);

    const documentId = data.id;
    delete data.id;

    try {
      const response = editPlanning({ documentId, data });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          key={pev.id}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "5%", maxWidth: "5%" }}>{title}</div>
          {columns.map((column: any) => (
            <div
              key={column}
              style={{ display: "flex", flexDirection: "row", width: "14%" }}
            >
              {/* <Checkbox name={`pev.${column}`} /> */}
              <Controller
                name={column}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth>
                    <InputLabel id="cooperativas">Cooperativas</InputLabel>
                    <Select
                      {...field}
                      name={`pev.${pev.id}.${column}`}
                      error={fieldState.error ? true : false}
                      labelId="cooperativas"
                      id="cooperativas"
                      label="cooperativas"
                      size="small"
                    >
                      {cooperatives.map((cooperative: any) => (
                        <MenuItem key={cooperative.id} value={cooperative.id}>
                          {cooperative?.cooperative_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {fieldState.error && (
                      <FormHelperText style={{ color: "red" }}>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </div>
          ))}
          <div key="submit">
            <Button variant="contained" color="primary" type="submit">
              salvar
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PevForm;
