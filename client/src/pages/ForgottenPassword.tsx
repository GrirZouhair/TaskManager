import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "../Styles/forgottenpassword.css";
import emailjs from "@emailjs/browser";
import { axiosClient } from "../Api/axios";
import { useNavigate } from "react-router-dom";

interface TempParams {
  email: string;
  secureCode: number | undefined;
}
const ForgotPassword = () => {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosClient.get(`/accounts/email/${enteredEmail}`);
      console.log(response.data);
      if (response.data.success) {
        if (response.data.employee) {
          sendEmployeeEmail(response.data.secureCode);
        } else if (response.data.user) {
          sendUserEmail(response.data.secureCode);
        } else {
          alert("Account not found.");
        }
      } else {
        alert("Account not found.");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      alert("Failed to check email. Please try again later.");
    }
  };

  const sendEmail = async (templateId: string, templateParams: any) => {
    setIsLoading(true);
    try {
      const response = await emailjs.send(
        "service_wgax0zh",
        templateId,
        templateParams,
        "d2-lxAAFU3LtpwZxO"
      );
      console.log("Email sent: " + response);
      alert("Password reset email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send password reset email. Please try again later.");
    } finally {
      setIsLoading(false);
      const securityCode = Number(prompt("Enter Your Secure Code : "));

      Number(templateParams.secureCode) === securityCode
        ? navigate(`/update-password/${enteredEmail}`) // Redirect to update password page
        : alert("Security code mismatch");
    }
  };

  const sendEmployeeEmail = async (securecode: number) => {
    const templateId = "template_88bivwv";
    const templateParams: TempParams = {
      email: enteredEmail,
      secureCode: securecode,
    };
    await sendEmail(templateId, templateParams);
  };

  const sendUserEmail = async (code: number) => {
    const templateId = "template_88bivwv";
    const templateParams = {
      email: enteredEmail,
      secureCode: code,
    };
    await sendEmail(templateId, templateParams);
  };

  return (
    <div className="center-container">
      <div className="container">
        <div className="text-center">
          <h3>
            <FontAwesomeIcon icon={faLock} size="4x" />
          </h3>
          <h2 className="text-center">Forgot Password?</h2>
          <p>You can reset your password here.</p>
          <div className="panel-body">
            <form onSubmit={checkEmail} className="form" method="post">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-envelope color-blue"></i>
                  </span>
                  <input
                    id="email"
                    name="email"
                    placeholder="email address"
                    className="form-control"
                    type="email"
                    value={enteredEmail}
                    onChange={(e) => setEnteredEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                  disabled={isLoading}
                >
                  {isLoading ? "Checking Email..." : "Reset Password"}
                </button>
              </div>
              <input
                type="hidden"
                className="hide"
                name="token"
                id="token"
                value=""
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
