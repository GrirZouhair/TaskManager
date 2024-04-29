import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../Api/axios";
import Sidebar from "../../components/SideBare";
import swal from "sweetalert";
import { headers } from "../../functions/getHeaders";
import "../../Styles/AjouterEmployee.css";

const AjouterEmployee: React.FC = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    formData.set(name, value);
  };

  const handleAddEmployee = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      formData.append(
        "password_confirmation",
        formData.get("password") as string
      );
      if (formData.get("password") !== formData.get("password_confirmation")) {
        swal({
          title: "warning!",
          text: "password mismatch",
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
      //await axiosClient.get("/sanctum/csrf-cookie");
      const response = await axiosClient.post("/employee/store", formData, {
        headers,
      });
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
      console.error("Error in adding employee:", error);
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

  return (
    <div className="row">
      <Sidebar />
      <section className="grid-container col-10">
        <div className="centerAjoutForm">
          <div className="Images">
            <img className="img2" src="image141.png" alt="Image2" />
          </div>
          <form onSubmit={handleAddEmployee}>
            <div className="control">
              <label>Nom Complet</label>
              <input
                type="text"
                name="full_name"
                onChange={handleInputChange}
              />
            </div>
            <div className="control">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="control password-control">
              <label>Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  onChange={handleInputChange}
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
              </div>
            </div>
            <div className="control password-control">
              <label>Password confirmation</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password_confirmation"
                  required
                  onChange={handleInputChange}
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
              </div>
            </div>
            <div className="control selectGenre">
              <label className="form-lable">Genre</label>
              <select
                className="form-select"
                name="gender"
                onChange={handleInputChange}
              >
                <option value="">Select votre genre</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </select>
            </div>
            <div className="button">
              <button id="retour" type="button">
                Retourner
              </button>
              <button type="submit" id="continue">
                Continue
              </button>
            </div>
          </form>
        </div>
        <img src="image17.png" className="w-100 h-100" alt="Background" />
      </section>
    </div>
  );
};

export default AjouterEmployee;
