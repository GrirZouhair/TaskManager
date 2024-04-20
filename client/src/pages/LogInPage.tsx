import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../Api/axios";
import "../Styles/Loginpage.css";

const ImageDescription: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(url == '') return alert('Please choose a role');
    try {
      const data = {
        email: email,
        password: password
      }
      axiosClient.get("/sanctum/csrf-cookie");
      const response = await axiosClient.post(url, data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      url == "/user/login" ? navigate('adminDashbord') : navigate('employeeDashboard')
    } catch (error) {
      console.error("Error in your login:", error);
    }
  };

  const handleSpaceClick = (role: string) => {
    if (role === "admin") {
      setUrl("/user/login");
    } else if (role === "employee") {
      setUrl("/employee/login");
    } else {
      console.error("Unknown role");
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
          <p>Admin</p>
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
            <button id="retour">Retourner</button>
            <button type="submit" id="continue">
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ImageDescription;
