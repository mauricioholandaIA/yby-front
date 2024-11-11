import api from "./api";

const uploadImage = async (file: any): Promise<any[]> => {
  const formData = new FormData();
  formData.append("files", file);

  const dadosUsuario = localStorage.getItem("usuario");

  const token = dadosUsuario && JSON.parse(dadosUsuario)?.jwt;

  try {
    // Envia os dados com fetch
    const response = await fetch("http://localhost:1337/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    return [];
  }
};

const createCollection = async (data: any) => {
  try {
    const response = await api.post("/collections", {
      data,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao criar a coleta:", error);
    return null;
  }
};

export { createCollection, uploadImage };
