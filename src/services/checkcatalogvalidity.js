import { apiURL } from "./apiURL";

export const listCatalogValidity = async () => {
  try {
    const res = await fetch(apiURL + "/CatalogValidity/CheckProgramValidity");
    const result = await res.json();
    return result;
  } catch (error) {
    console.log("No se pudo encontrar la ruta asociada a sus datos", error);
    return [];
  }
};
