import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { type } from "os";
import { Controller, useForm } from "react-hook-form";

const ModalFormComponent = ({ open, handleClose, images }: any) => {
  const { control, handleSubmit } = useForm({});

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,

            bgcolor: "background.paper",
            boxShadow: 24,
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar registro do PEV
            </Typography>

            <IconButton onClick={handleClose} size="medium">
              <CloseIcon />
            </IconButton>
          </div>

          <Typography>
            Clique nos dados abaixo para editar as informações deste PEV.
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "100%",
              gap: "10px",
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <div>
              <Controller
                name={"residuos"}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth>
                    <InputLabel id="residuos">Tipo de residuos</InputLabel>
                    <Select
                      error={fieldState.error ? true : false}
                      {...field}
                      labelId="residuos"
                      id="Tipo de residuos"
                      label="residuos"
                    >
                      <MenuItem value={"papel"}>Pape</MenuItem>
                      <MenuItem value={"plastico"}>Plastico</MenuItem>
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

            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  style={{ marginTop: "10px" }}
                  {...field}
                  id="weight"
                  type="text"
                  placeholder="peso em kg"
                  fullWidth
                />
              )}
            />
          </form>

          <div>
            <Typography>coletor</Typography>
          </div>

          <div>
            <Typography>avaria</Typography>
          </div>

          <div>
            <Typography>Justificativa</Typography>
            <Controller
              name={`justify`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="justify"
                  type="text"
                  placeholder={"editei o PEV porque..."}
                  fullWidth
                  label={"Justificativa"}
                  variant="outlined"
                  size="small"
                  // focused
                  autoComplete="off"
                />
              )}
            />
          </div>
        </Box>
      </>
    </Modal>
  );
};

export default ModalFormComponent;
