import { axiosClient } from "../Api/axios";
import { headers } from "./getHeaders";

export const LogOut = (logedIn: string) => {
  axiosClient
    .post(`/${logedIn}/logout`, {}, { headers })
    .then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem(logedIn);
        localStorage.removeItem("token");
      }
    })
    .catch((error) => {
      console.error(
        "Erreur de déconnexion:",
        error.response ? error.response.data : error.message
      );
    });
};
