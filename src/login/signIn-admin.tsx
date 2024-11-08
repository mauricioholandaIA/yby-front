import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled as styledComponents } from "styled-components";
import { authAdmin, authClient } from "../api/auth";
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

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById(
      "admin-identifier"
    ) as HTMLInputElement;
    const password = document.getElementById(
      "admin-password"
    ) as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

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
      const email = document.getElementById(
        "admin-identifier"
      ) as HTMLInputElement;
      const password = document.getElementById(
        "admin-password"
      ) as HTMLInputElement;

      console.log(email.value, password.value);

      const admin = await authAdmin({
        identifier: email.value,
        password: password.value,
      });

      const formattedAdmin = {
        jwt: admin.jwt,
        username: admin.user.username,
        documentId: admin.user.documentId,
        email: admin.user.email,
        isAdmin: admin.user.admin,
        id: admin.user.id,
        client_id: admin.user.client_id,
      };

      if (admin) {
        login(formattedAdmin);
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
          onSubmit={handleSubmit}
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
              label={"Endereço de e-mail"}
              variant="outlined"
              size="small"
              focused
              autoComplete="off"
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              id="admin-identifier"
              autoFocus
              required
              fullWidth
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <TextField
              type={"outlined"}
              label={"Senha"}
              variant="outlined"
              size="small"
              focused
              autoComplete="off"
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              id="admin-password"
              autoFocus
              required
              fullWidth
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>

          <Link to="/signIn-client">Ir para login da cooperativa</Link>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSingIn}
            style={{ color: "white" }}
          >
            Entrar
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
