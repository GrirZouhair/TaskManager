import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { AxiosResponse } from "axios";
import { axiosClient } from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/ChangePassword.css";

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    actuelPassword: "",
    password: "",
    password_confirmation: "",
  });
  const [showActuelPassword, setShowActuelPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      if (formData.password !== formData.password_confirmation) {
        return alert("Passwords mismatch");
      }
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const userItem = localStorage.getItem("user");
      const id = userItem ? JSON.parse(userItem).id : null;
      if (!id) {
        // Handle the case where id is null, maybe redirect or show an error message
        navigate("/");
        return;
      }
      const response = await axiosClient.put<
        string,
        AxiosResponse<{ message: string }>
      >(`/user/update/${id}`, formData, { headers });
      alert(response.data.message);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <section className="row">
      <div className="col-12 col-md-5 d-flex flex-column p-5 justify-content-center">
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
                      ? "Hide"
                      : "Show"
                    : input.name === "password"
                    ? showNewPassword
                      ? "Hide"
                      : "Show"
                    : showConfirmNewPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>
          ))}

          <div className="button">
            <button type="button" id="retour">
              Retourner
            </button>
            <button type="submit" id="continue">
              Continue
            </button>
          </div>
        </form>
      </div>
      <img
        src="/public/Image201.png"
        className="main-psw col-md-5 d-md-block d-none"
      />
    </section>
  );
};

export default ChangePassword;
