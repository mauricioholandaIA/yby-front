import api from "./api";

const createCooperative = async ({
  cooperative_name,
  cooperative_code,
}: {
  cooperative_name: string;
  cooperative_code: string;
}) => {
  // todo criar o usuario da cooperativa antes de criar a cooperativa
  console.log(cooperative_name, cooperative_code);
  try {
    const response = await api.post("/cooperatives", {
      data: {
        cooperative_name,
        cooperative_code_access: cooperative_code,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar a cooperativa:", error);
    alert("Erro ao criar a cooperativa");

    return null;
  }
};

const getCooperatives = async () => {
  try {
    const response = await api.get("/cooperatives");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as cooperativas:", error);
    return null;
  }
};

const getListOfPevsByCooperative = async () => {
  try {
    const response = await api.get("/plannings?populate=*");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os cooperativas:", error);
    return null;
  }
};

export { createCooperative, getCooperatives, getListOfPevsByCooperative };
