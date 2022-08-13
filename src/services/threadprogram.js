import { apiURL } from "./apiURL";

export const listarThreads = async () => {
  try {
    const res = await fetch(apiURL + "/Catalog/GetThreadProgramList");
    const result = await res.json();
    return result;
  } catch (error) {
    console.log("No se pudo encontrar la ruta asociada a sus datos", error);
    return [];
  }
};
