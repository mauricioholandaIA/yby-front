import TuneIcon from "@mui/icons-material/Tune";
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { type } from "os";
import { Controller, useForm } from "react-hook-form";
import { editPlanning } from "../../api/planning";

const PevForm = ({ title = "", cooperatives, pev }: any) => {
  const columns = ["segunda", "terca", "quarta", "quinta", "sexta"];

  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: pev.id,
      segunda: pev?.seg?.value,
      terca: pev?.ter?.value,
      quarta: pev?.qua?.value,
      quinta: pev?.qui?.value,
      sexta: pev?.sex?.value,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);

    const documentId = data.id;
    delete data.id;

    const formatData = {
      seg: data.segunda,
      ter: data.terca,
      qua: data.quarta,
      qui: data.quinta,
      sex: data.sexta,
    };

    try {
      const response = editPlanning({ documentId, data: formatData });
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
            flexDirection: "column",
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "rgba(221, 195, 147, 0.2)",
          }}
        >
          <div style={{ width: "20%", maxWidth: "100%" }}>{title}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {columns.map((column: any) => (
              <Controller
                name={column}
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <div
                      key={column}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "200px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          {column.charAt(0).toUpperCase() + column.slice(1)}
                        </div>

                        <Checkbox
                          name={`pev.${column}`}
                          checked={field.value}
                          onChange={(event) => {
                            if (event.target.checked) {
                              // Enable the Select component
                              field.onChange(true);
                            } else {
                              // Disable the Select component
                              field.onChange(false);
                            }
                          }}
                        />
                      </div>

                      <FormControl fullWidth>
                        <InputLabel size="small" id="cooperativas">
                          cooperativas
                        </InputLabel>
                        <Select
                          {...field}
                          name={`pev.${pev.id}.${column}`}
                          error={fieldState.error ? true : false}
                          labelId="cooperativas"
                          id="cooperativas"
                          label="cooperativas"
                          size="small"
                          style={{ backgroundColor: "white" }}
                          disabled={!field.value}
                        >
                          {cooperatives.map((cooperative: any) => (
                            <MenuItem
                              key={cooperative.id}
                              value={cooperative.id}
                            >
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
                    </div>
                  </>
                )}
              />
            ))}

            <div key="submit" style={{ marginTop: "40px" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ color: "white" }}
              >
                salvar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PevForm;
