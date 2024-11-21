import { FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { styled as styledComponents } from "styled-components";
import { authAdmin } from "../api/auth";
import YbyLogo from "../assets/yby-logo";
import { AuthContext } from "../context/auth-context";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  border-radius: 20px;


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

const schema = yup.object().shape({
  adminIdentifier: yup.string().required("Email é obrigatório").email(),
  adminPassword: yup.string().required("Senha é obrigatória"),
});

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      adminIdentifier: "",
      adminPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const admin = await authAdmin({
        identifier: data.adminIdentifier,
        password: data.adminPassword,
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
    } catch (error) {
      setError("adminIdentifier", {
        type: "server",
        message: "Erro ao fazer login",
      });
      setError("adminPassword", {
        type: "server",
        message: "Erro ao fazer login",
      });
    }
  };

  return (
    <SignInContainer>
      <Card>
        <YbyLogo
          style={{
            width: "200px",
            maxWidth: "200px",
            height: "auto",
            margin: "auto",
          }}
        />
        <Typography
          fontSize={20}
          style={{
            marginTop: "12px ",
            marginBottom: "6px",
            textAlign: "start",
          }}
        >
          Conecte-se à YBY
        </Typography>
        <Divider />

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "16px",
            marginTop: "28px",
          }}
        >
          <Controller
            name={`adminIdentifier`}
            control={control}
            render={({ field, fieldState }) => (
              <FormControl>
                <TextField
                  {...field}
                  id="adminIdentifier"
                  type="text"
                  placeholder="Seu e-mail"
                  required
                  fullWidth
                  label="Endereço de e-mail"
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  error={fieldState.error ? true : false}
                />
                {fieldState.error && (
                  <FormHelperText style={{ color: "red" }}>
                    e-mail invalido
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name={`adminPassword`}
            control={control}
            render={({ field, fieldState }) => (
              <FormControl>
                <TextField
                  {...field}
                  id="adminPassword"
                  type="password"
                  placeholder="Sua senha"
                  required
                  fullWidth
                  label="Senha"
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  error={fieldState.error ? true : false}
                />
                {fieldState.error && (
                  <FormHelperText style={{ color: "red" }}>
                    senha invalida
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Link to="/signIn-client">Ir para login da cooperativa</Link>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            style={{ color: "white" }}
          >
            Entrar
          </Button>
        </form>
      </Card>
    </SignInContainer>
  );
}
