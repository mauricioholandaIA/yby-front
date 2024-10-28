import api from "./api";

const authAdmin = async ({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/local", {
      identifier,
      password,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);

    return null;
  }
};

const authClient = async ({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/local", {
      identifier,
      password,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);

    return null;
  }
};

export { authAdmin, authClient };
