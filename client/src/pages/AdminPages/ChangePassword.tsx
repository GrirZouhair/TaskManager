import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/ChangePassword.css";

const ChangePassword: React.FC = () => {
  const [actuelPassword, setActuelPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [showActuelPassword, setShowActuelPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleActuelPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActuelPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const toggleShowActuelPassword = () => {
    setShowActuelPassword((prevShow) => !prevShow);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((prevShow) => !prevShow);
  };

  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword((prevShow) => !prevShow);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // if (!token) {
      //   navigate("/");
      //   return;
      // }

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const formData = new FormData();
      formData.append("actuelPassword", actuelPassword);
      formData.append("newPassword", newPassword);
      formData.append("confirmNewPassword", confirmNewPassword);

      await axios.get<string, AxiosResponse<string>>("url");
      const response = await axios.post<string, AxiosResponse<{ message: string }>>("url", formData, { headers });
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
    <section className="container">
      <div className="center">
        <div className="img-content">
          <img className="img" src="Image14.png" alt="14" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="control">
            <label htmlFor="actuelPassword">Mot de passe actuel</label>
            <div className="password-input">
              <input
                type={showActuelPassword ? "text" : "password"}
                id="actuelPassword"
                name="actuelPassword"
                value={actuelPassword}
                onChange={handleActuelPasswordChange}
                required
              />
              <button type="button" className="show-hide-button" onClick={toggleShowActuelPassword}>
                {showActuelPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="control">
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <div className="password-input">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
              <button type="button" className="show-hide-button" onClick={toggleShowNewPassword}>
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="control">
            <label htmlFor="confirmNewPassword">Confirmer nouveau mot de passe</label>
            <div className="password-input">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
                required
              />
              <button type="button" className="show-hide-button" onClick={toggleShowConfirmNewPassword}>
                {showConfirmNewPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
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
      <div className="main-psw"></div>
    </section>
  );
};

export default ChangePassword;
