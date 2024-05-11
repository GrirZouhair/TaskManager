import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../Api/axios";
import "../Styles/Loginpage.css";
import { useLogedInContext } from "../provider/logedInUser";
import swal from "sweetalert";

interface UserData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setlogedIN }: any = useLogedInContext();
  const navigate = useNavigate();
  const adminRef = useRef<HTMLImageElement>(null);
  const employeeRef = useRef<HTMLImageElement>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");



  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSpaceClick = (role: string) => {
    setlogedIN(role);
    setUrl(role === "user" ? "/user/login" : "/employee/login");
    setSelectedRole(role);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (url === "") {
      swal({
        title: "Lire l'alerte !",
        text: "Veuillez choisir un rôle",
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

    try {
      const data: UserData = { email, password };
      axiosClient.get("/sanctum/csrf-cookie");
      const response = await axiosClient.post(url, data);
      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.token);
        const storageKey = url === "/user/login" ? "user" : "employee";
        localStorage.setItem(
          storageKey,
          JSON.stringify(response.data[storageKey])
        );
        navigate(url === "/user/login" ? "adminDashbord" : "employeeDashboard");
      }
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
    } catch (error: any) {
      console.error("Error in your login:", error);
      swal({
        title: "Erreur!",
        text: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer ultérieurement.",
        icon: "error",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
          },
        },
      });
      return;
    }
  };

  return (
    <section className="login-container">
      <div className="center">
        <div className="Images">
          <div
            className={`circle ${selectedRole === "user" ? "circle-selected" : ""
              }`}
          ></div>
          <div className="AdminSpace">
            <img
              className={`img2 ${selectedRole === "user" ? "selected" : ""}`}
              ref={adminRef}
              src="Image2.png"
              alt="Image2"
              onClick={() => handleSpaceClick("user")}
            />
            <p className={`admin ${selectedRole === "user" ? "selected" : ""}`}>
              Admin
            </p>
          </div>
          <div className="EmployeSpace">
            <div
              className={`circle ${selectedRole === "employee" ? "circle-selected" : ""
                }`}
            ></div>
            <img
              className={`img3 ${selectedRole === "employee" ? "selected" : ""
                }`}
              ref={employeeRef}
              src="Image3.png"
              alt="Image3"
              onClick={() => handleSpaceClick("employee")}
            />
            <p
              className={`employeur ${selectedRole === "employee" ? "selected" : ""
                }`}
            >
              Employé
            </p>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="control">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="control password-control">
            <label>Mot de passe</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <span className="forget__password" onClick={() => navigate('/forgottenpassword')}>Forgotten Password? Rset it</span>
          <button type="submit" className="submit__button">
            Continuer
          </button>
        </form>
        <div className="register">
          <p className="signup-image-link">
            Pas encore inscrit?
            <span className="p-3" onClick={() => navigate("/register")}>S'inscrire</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
