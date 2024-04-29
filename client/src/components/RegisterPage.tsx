import React from 'react';
import "../Styles/RegisterPage.css";
import register from "../assets/register.png";
import { useNavigate } from 'react-router-dom';
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
    return (
        <div className="signup-form">
            <h2 className="form-title">Cree Votre Compte</h2>
            <form method="POST" className="register-form" id="register-form">

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Your Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input type="password" name="pass" id="pass" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="re-pass">Password confirmation</label>
                    <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                </div>
                <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                </div>
            </form>
        </div>
    );
};

const RegisterImage = () => {
    const navigate = useNavigate();
    return (
        <div className="signup-image">
            <figure><img src={register} alt="sign up image" /></figure>
            <div className="signup-image-link" onClick={() => navigate('/')}
            >You Already Have An Account? <span>Log in</span></div>
        </div>
    );
};



export default RegisterForm;
