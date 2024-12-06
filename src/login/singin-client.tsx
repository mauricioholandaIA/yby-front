import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { styled as styledComponents } from "styled-components";
import { authClient } from "../api/auth";
import YbyMarca from "../assets/yby-marca";
import { AuthContext } from "../context/auth-context";

import { CircularProgress, FormHelperText } from "@mui/material";
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

const schema = yup.object().shape({
  cooperativePassword: yup.string().required("Senha é obrigatória"),
});

export default function SignInClient() {
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      cooperativePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const client = await authClient({
        identifier: `${data.cooperativePassword}@coop.com`,
        password: data.cooperativePassword,
      });

      const formattedClient = {
        jwt: client.jwt,
        username: client.user.username,
        documentId: client.user.documentId,
        email: client.user.email,
        isAdmin: client.user.admin,
        id: client.user.id,
        cooperative_id: client.user.cooperative_id,
      };

      if (client) {
        login(formattedClient);
        setLoading(false);

        navigate("/ponto-coleta");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("cooperativePassword", {
        type: "server",
        message: "Código de acesso inválido",
      });
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
            name={`cooperativePassword`}
            control={control}
            render={({ field, fieldState }) => (
              <FormControl>
                <TextField
                  {...field}
                  id="cooperativePassword"
                  type="text"
                  placeholder="Código de acesso"
                  required
                  fullWidth
                  label="Código de acesso"
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  error={fieldState.error ? true : false}
                />
                {fieldState.error && (
                  <FormHelperText style={{ color: "red" }}>
                    Codigo de acesso inválido
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Link style={{ width: "200px" }} to="/signIn">
            Ir para login do cliente
          </Link>

          <Button
            disabled={loading}
            style={{ color: "#ffff" }}
            type="submit"
            variant="contained"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </Card>
    </SignInContainer>
  );
}
