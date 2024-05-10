import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { AxiosResponse } from "axios";
import { axiosClient } from "../Api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBare";
import HeaderEmployee from "../components/HeaderEmployee";
import { useLogedInContext } from "../provider/logedInUser";
import { headers } from "../functions/getHeaders";
import "../Styles/ChangePassword.css";
import swal from "sweetalert";

const ChangeEmail: React.FC = () => {
  const [formData, setFormData] = useState({
    actuelEmail: "",
    email: "",
    email_confirmation: "",
  });
  const { logedIn }: any = useLogedInContext();
  const navigate = useNavigate();

  useEffect(() => {
    !logedIn && navigate("/");
  }, []);

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
        swal({
          title: "warining!",
          text: "Email mismatch",
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
        { [key: string]: string },
        AxiosResponse<{ message: string; [key: string]: string }>
      >(`/${logedIn}/update/${id}`, { email: formData.email }, { headers });
      const data = response.data[logedIn];
      localStorage.setItem(logedIn, data);
      swal({
        title: "sucessfully",
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
        title: "Error!",
        text: "something went wrong try again",
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

            <button type="submit" className="submit__button">
              Continuer
            </button>
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
