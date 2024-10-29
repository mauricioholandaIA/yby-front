import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled as styledComponents } from "styled-components";
import { authClient } from "../api/auth";
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
  
 
  padding: 20px;
  background-color: white;
  border-radius: 10px;

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

  const handleSingIn = async () => {
    const isValid = validateInputs();
    if (isValid) {
      const password = document.getElementById(
        "client-password"
      ) as HTMLInputElement;
      // com a senha , fazer login e com os dados de usuario da resposta salvar no contexto

      const client = await authClient({
        identifier: password.value,
        password: password.value,
      });

      console.log(client);

      const formattedClient = {
        jwt: client.jwt,
        username: client.user.username,
        documentId: client.user.documentId,
        email: client.user.email,
        isAdmin: client.user.admin,
        id: client.user.id,
      };

      if (client) {
        login(formattedClient);
        navigate("/ponto-coleta");
      }
    }
  };

  return (
    <SignInContainer>
      <Card>
        <YbyMarca
          style={{
            width: "100%",
            maxWidth: "100px",
            height: "auto",
            margin: "auto",
          }}
        />
        <Typography
          fontSize={20}
          style={{
            marginTop: "10px ",
            marginBottom: "10px",
            textAlign: "start",
          }}
        >
          Conecte-se à YBY
        </Typography>
        <Divider />
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            marginTop: "20px",
          }}
        >
          <FormControl>
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

          <Link to="/signIn">Ir para tela de login</Link>

          <Button fullWidth variant="contained" onClick={handleSingIn}>
            Entrar
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
