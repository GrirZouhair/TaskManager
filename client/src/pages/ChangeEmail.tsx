import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { AxiosResponse } from "axios";
import { axiosClient } from "../Api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBare";
import HeaderEmployee from "../components/HeaderEmployee";
import { useLogedInContext } from "../provider/logedInUser";
import "../Styles/ChangePassword.css";

const ChangeEmail: React.FC = () => {
  const [formData, setFormData] = useState({
    actuelEmail: "",
    email: "",
    email_confirmation: "",
  });
  const { logedIn }: any = useLogedInContext();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      if (formData.email !== formData.email_confirmation) {
        return alert("Email mismatch");
      }
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const userItem = localStorage.getItem(logedIn);
      const id = userItem ? JSON.parse(userItem).id : null;
      if (!id) {
        navigate("/");
        return;
      }
      const response = await axiosClient.put<
        string,
        AxiosResponse<{ message: string }>
      >(`/${logedIn}/update/${id}`, { email: formData.email }, { headers });
      localStorage.setItem(logedIn, response.data[`${logedIn}`]);
      alert(response.data.message);
      console.log(response.data);
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
    <div className="row">
      {logedIn === "user" ? <Sidebar /> : <HeaderEmployee />}
      <section className="row col-10">
        <div className="col-12 col-md-5 d-flex flex-column p-5 justify-content-center">
          <div className="img-content">
            <img className="img" src="Image142.png" alt="14" />
          </div>
          <form onSubmit={handleSubmit}>
            {[
              {
                label: "Email actuel",
                name: "actuelEmail",
                value: formData.actuelEmail,
              },
              {
                label: "Nouveau email",
                name: "email",
                value: formData.email,
              },
              {
                label: "Confirmer email",
                name: "email_confirmation",
                value: formData.email_confirmation,
              },
            ].map((input) => (
              <div className="control" key={input.name}>
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  type={input.name === "actuelEmail" ? "email" : "email"}
                  id={input.name}
                  name={input.name}
                  value={input.value}
                  onChange={handleInputChange}
                  required
                />
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
          src="/public/Image20.png"
          className="main-psw col-md-5 d-md-block d-none"
        />
      </section>
    </div>
  );
};

export default ChangeEmail;
