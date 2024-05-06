import { useEffect } from "react";
import { axiosClient } from "../Api/axios";
import { headers } from "../functions/getHeaders";
import { useLogedInContext } from "../provider/logedInUser";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const { logedIn }: any = useLogedInContext();
  !logedIn && navigate("/");
  useEffect(() => {
    try {
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
    } catch (e: any) {
      console.error("error: " + e.message);
    } finally {
      navigate("/");
    }
  }, []);

  return <p></p>;
};

export default LogOut;
