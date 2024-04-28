import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../Api/axios";
import "../Styles/Loginpage.css";
import swal from 'sweetalert';

interface UserData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSpaceClick = (role: string) => {
    setUrl(role === "admin" ? "/user/login" : "/employee/login");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (url === "") {
      swal({
        title: "Read the alert!",
        text: "Please choose a role",
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
      await axiosClient.get("/sanctum/csrf-cookie");
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
    } catch (error) {
      console.error("Error in your login:", error);
    }
  };

  return (
    <section className="login-container">
      <div className="center">
        <div className="Images">
          <img
            className="img2"
            src="Image2.png"
            alt="Image2"
            onClick={() => handleSpaceClick("admin")}
          />
          <p className="admin">Admin</p>
          <img
            className="img3"
            src="Image3.png"
            alt="Image3"
            onClick={() => handleSpaceClick("employee")}
          />
          <p className="employeur">Employee</p>
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
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="button">
            <button type="button" className="button-56">
              Retourner
            </button>
            <button type="submit" className="button-56">
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
