import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { editPlanning } from "../../api/planning";

const PevForm = ({ title = "", cooperatives, pev }: any) => {
  const columns = ["segunda", "terca", "quarta", "quinta", "sexta"];
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      id: pev.id,
      segunda: pev?.seg?.value || false,
      terca: pev?.ter?.value || false,
      quarta: pev?.qua?.value || false,
      quinta: pev?.qui?.value || false,
      sexta: pev?.sex?.value || false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    const documentId = data.id;
    delete data.id;

    // Verificação de erro antes de continuar
    if (data.segunda === true) {
      setError("segunda", { message: "Valor inválido" });
      setLoading(false);
      return; // Interrompe a execução se houver erro
    }

    if (data.terca === true) {
      setError("terca", { message: "Valor inválido" });
      setLoading(false);

      return; // Interrompe a execução se houver erro
    }

    if (data.quarta === true) {
      setError("quarta", { message: "Valor inválido" });
      setLoading(false);

      return; // Interrompe a execução se houver erro
    }

    if (data.quinta === true) {
      setError("quinta", { message: "Valor inválido" });
      setLoading(false);

      return; // Interrompe a execução se houver erro
    }

    if (data.sexta === true) {
      setError("sexta", { message: "Valor inválido" });
      setLoading(false);

      return; // Interrompe a execução se houver erro
    }

    const formatData = {
      seg: data.segunda === false ? null : data.segunda,
      ter: data.terca === false ? null : data.terca,
      qua: data.quarta === false ? null : data.quarta,
      qui: data.quinta === false ? null : data.quinta,
      sex: data.sexta === false ? null : data.sexta,
    };

    try {
      editPlanning({ documentId, data: formatData });
      setLoading(false);
    } catch (error) {
      setLoading(false);

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
            border: "1px solid #15853B",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontWeight: "500", fontSize: "20px" }}>
              {title}
            </Typography>
            <Button
              variant="contained"
              type="submit"
              style={{ color: "white" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "SALVAR"
              )}
            </Button>
          </div>

          <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />

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
                        <div>
                          {column === "terca"
                            ? "Terça"
                            : column.charAt(0).toUpperCase() + column.slice(1)}
                        </div>
                      </div>

                      <FormControl
                        sx={{ height: "55px", marginTop: "8px" }}
                        fullWidth
                      >
                        <InputLabel size="small" id="cooperativas">
                          Cooperativa
                        </InputLabel>
                        <Select
                          {...field}
                          color="secondary"
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
                              {cooperative?.cooperative_name
                                .charAt(0)
                                .toUpperCase() +
                                cooperative?.cooperative_name.slice(1)}
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
          </div>
        </div>
      </form>
    </>
  );
};

export default PevForm;
