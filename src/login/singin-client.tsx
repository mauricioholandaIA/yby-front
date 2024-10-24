import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled as styledComponents } from "styled-components";
import YbyMarca from "../assets/yby-marca";
import { AuthContext } from "../context/auth-context";

const Card = styledComponents.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 30%;
  max-width: 550px;
  min-width: 300px;
  margin: auto;
  box-shadow: hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px,
    hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: white;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 100%;
    min-width: 100%;
    gap: 5px;
    height: 100%;
    width: 100vw;
    padding: 40px;
    margin: 0px;
  }
  @media (max-width: 480px) {
    padding: 10px;
    gap: 2px;
    height: 100%;
    width: 100vw;
    padding: 40px;
    margin: 0px;
  }
  overflow-x: hidden;
  overflow-y: hidden;
`;

const SignInContainer = styledComponents.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(221, 195, 147, 0.2);
    min-height: 100vh;
    height: 100vh;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
`;

export default function SignInClient() {
  const { login } = useContext(AuthContext);

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const password = document.getElementById(
      "client-password"
    ) as HTMLInputElement;
    let isValid = true;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSingIn = () => {
    const isValid = validateInputs();
    if (isValid) {
      const password = document.getElementById(
        "client-password"
      ) as HTMLInputElement;
      // com a senha , fazer login e com os dados de usuario da resposta salvar no contexto
      login({
        id: "1",
        nome: "YBY",
        email: "QpL0x@example.com",
        tipo: "cliente",
      });

      navigate("/ponto-coleta");
    }

    // const resposta = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, senha }),
    // });

    // const dadosUsuario = await resposta.json();
  };

  return (
    <SignInContainer>
      <Card>
        <YbyMarca
          style={{ width: "100%", maxWidth: "100px", height: "auto" }}
        />
        <Typography fontSize={20}>Conecte-se à YBY</Typography>
        <Divider />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Código de acesso</FormLabel>
            </Box> */}

            <TextField
              type={"outlined"}
              label={"Código de acesso"}
              variant="outlined"
              size="small"
              focused
              autoComplete="off"
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              id="client-password"
              autoFocus
              required
              fullWidth
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label={<Typography>Eu aceito os Termos e Condições</Typography>}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSingIn}
          >
            Entrar
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
