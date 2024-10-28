import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled as styledComponents } from "styled-components";
import YbyMarca from "../assets/yby-marca";

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

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const navigate = useNavigate();
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

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

  const handleSingIn = () => {
    // const isValid = validateInputs();
    // if (isValid) {
    //   navigate("/ponto-coleta");
    // }
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
            <FormLabel htmlFor="email">Endereço de e-mail</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              // label={label}

              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
              sx={{ ariaLabel: "email" }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Senha</FormLabel>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              // label={label}

              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>

          <Link to="/signIn-client">Ir para tela de cliente</Link>

          <Button fullWidth variant="contained" onClick={() => handleSingIn}>
            Entrar
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
