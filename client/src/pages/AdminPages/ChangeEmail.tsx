import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBare";
import "../../Styles/ChangeEmail.css";

const ChangeEmail: React.FC = () => {
  const [actuelEmail, setActuelEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [confirmNewEmail, setConfirmNewEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleActuelEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActuelEmail(e.target.value);
  };

  const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleConfirmNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const formData = new FormData();
      formData.append("actuelEmail", actuelEmail);
      formData.append("newEmail", newEmail);
      formData.append("confirmNewEmail", confirmNewEmail);

      await axios.get("url");
      const response = await axios.post("url", formData, { headers });
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
    <>
    <Sidebar />
    <section className="container col-10">
      <div className="center">
        <div className="img-content">
          <img className="img" src="Image142.png" alt="14" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="control">
            <label htmlFor="actuelEmail">Email actuel</label>
            <div className="email-input">
              <input
                type="email"
                id="actuelEmail"
                name="actuelEmail"
                value={actuelEmail}
                onChange={handleActuelEmailChange}
                required
              />
            </div>
          </div>
          <div className="control">
            <label htmlFor="newEmail">Nouvel email</label>
            <div className="email-input">
              <input
                type="email"
                id="newEmail"
                name="newEmail"
                value={newEmail}
                onChange={handleNewEmailChange}
                required
              />
            </div>
          </div>
          <div className="control">
            <label htmlFor="confirmNewEmail">Confirmer nouvel email</label>
            <div className="email-input">
              <input
                type="email"
                id="confirmNewEmail"
                name="confirmNewEmail"
                value={confirmNewEmail}
                onChange={handleConfirmNewEmailChange}
                required
              />
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
    </>
  );
};

export default ChangeEmail;
