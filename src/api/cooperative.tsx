import api from "./api";

const createCooperative = async ({
  cooperative_name,
  cooperative_code,
}: {
  cooperative_name: string;
  cooperative_code: string;
}) => {
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
    console.error("Erro ao fazer login:", error);

    return null;
  }
};

export { createCooperative };
