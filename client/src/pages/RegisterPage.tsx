import { useState } from "react";
import "../Styles/RegisterPage.css";
import register from "../assets/register.png";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../Api/axios";
import swal from "sweetalert";
import { useLogedInContext } from "../provider/logedInUser";

type FormData = {
  email: string;
  password: string;
  password_confirmation: string;
};
const RegisterForm = () => {
  return (
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <RegisterFormContent />
            <RegisterImage />
          </div>
        </div>
      </section>
    </div>
  );
};

const RegisterFormContent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const { setlogedIN }: any = useLogedInContext();

  const handelChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      swal({
        title: "Warning!",
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
    try {
      const res = await axiosClient.post("/user/store", formData);
      if (res.data.status === 200) {
        setlogedIN("user");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        swal({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
            },
          },
        });
        navigate("/adminDashbord");
      }
    } catch (e) {
      console.log(e);
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
      return;
    }
  };
  return (
    <div className="signup-form">
      <h2 className="form-title">Cree Votre Compte</h2>
      <form
        method="POST"
        className="register-form"
        id="register-form"
        onSubmit={handelSubmit}
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            onChange={handelChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pass">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="pass"
            placeholder="Password"
            onChange={handelChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="re-pass">Mot de passe confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            id="re_pass"
            placeholder="Repeat your password"
            onChange={handelChange}
          />
        </div>
        <div className="form-group form-button">
          <input
            type="submit"
            name="signup"
            id="signup"
            className="form-submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
};

const RegisterImage = () => {
  const navigate = useNavigate();
  return (
    <div className="signup-image">
      <figure>
        <img src={register} alt="sign up image" />
      </figure>
      <div className="signup-image-link" onClick={() => navigate("/")}>
        Avez vous déjà un compte? <span>Log in</span>
      </div>
    </div>
  );
};

export default RegisterForm;
