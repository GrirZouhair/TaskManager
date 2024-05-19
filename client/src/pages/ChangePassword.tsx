import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { AxiosResponse } from "axios";
import { axiosClient } from "../Api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBare";
import HeaderEmployee from "../components/HeaderEmployee";
import { useLogedInContext } from "../provider/logedInUser";
import swal from "sweetalert";
import "../Styles/ChangePassword.css";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    actuelPassword: "",
    password: "",
    password_confirmation: "",
  });
  const [showActuelPassword, setShowActuelPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { logedIn }: any = useLogedInContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    !logedIn && navigate("/");
  }, []);

  const togglePasswordVisibility = (type: string) => {
    switch (type) {
      case "actuelPassword":
        setShowActuelPassword((prevShow) => !prevShow);
        break;
      case "password":
        setShowNewPassword((prevShow) => !prevShow);
        break;
      case "password_confirmation":
        setShowConfirmNewPassword((prevShow) => !prevShow);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      if (formData.password !== formData.password_confirmation) {
        swal({
          title: "Attention!",
          text: "Les mots de passe ne correspondent pas",
          icon: "warning",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
            },
          },
        });
        return;
      }
      const userItem = localStorage.getItem(logedIn);
      const id = userItem ? JSON.parse(userItem).id : null;
      if (!id) {
        navigate("/");
        return;
      }
      const response = await axiosClient.put<
        string,
        AxiosResponse<{ message: string }>
      >(
        `/${logedIn}/update/${id}`,
        {
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        },
        { headers }
      );
      swal({
        title: "Succès",
        text: response.data.message,
        icon: "success",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      swal({
        title: "Erreur!",
        text: "Quelque chose s'est mal passé, veuillez réessayer",
        icon: "error",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={`row ${logedIn == "employee" && "empDashboard-container"}`}>
      {logedIn === "user" ? <Sidebar /> : <HeaderEmployee />}
      <section
        className={`row ${
          logedIn === "user" ? "col-10" : "col-12 mx-auto mt-5 w-100 gap-5"
        } `}
      >
        {" "}
        <div className="col-12 col-md-5 d-flex gap-5 flex-column p-5 justify-content-center">
          <div className="img-content">
            <img className="img" src="Image14.png" alt="14" />
          </div>
          <form onSubmit={handleSubmit}>
            {[
              {
                label: "Mot de passe actuel",
                name: "actuelPassword",
                value: formData.actuelPassword,
              },
              {
                label: "Nouveau mot de passe",
                name: "password",
                value: formData.password,
              },
              {
                label: "Confirmer nouveau mot de passe",
                name: "password_confirmation",
                value: formData.password_confirmation,
              },
            ].map((input) => (
              <div className="control" key={input.name}>
                <label htmlFor={input.name}>{input.label}</label>
                <div className="password-input">
                  <input
                    type={
                      input.name === "actuelPassword"
                        ? showActuelPassword
                          ? "text"
                          : "password"
                        : input.name === "password"
                        ? showNewPassword
                          ? "text"
                          : "password"
                        : showConfirmNewPassword
                        ? "text"
                        : "password"
                    }
                    id={input.name}
                    name={input.name}
                    value={input.value}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="show-hide-button"
                    onClick={() => togglePasswordVisibility(input.name)}
                  >
                    {input.name === "actuelPassword"
                      ? showActuelPassword
                        ? "Masquer"
                        : "Afficher"
                      : input.name === "password"
                      ? showNewPassword
                        ? "Masquer"
                        : "Afficher"
                      : showConfirmNewPassword
                      ? "Masquer"
                      : "Afficher"}
                  </button>
                </div>
              </div>
            ))}

            <button type="submit" className="submit__button">
              Continuer
            </button>
          </form>
        </div>
        <img
          src="Image201.png"
          className="main-psw col-md-5 d-md-block d-none"
        />
      </section>
    </div>
  );
};

export default ChangePassword;
