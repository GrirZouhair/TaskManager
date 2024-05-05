import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import "../Styles/forgottenpassword.css";
import emailjs from "emailjs-com";
import { axiosClient } from '../Api/axios';

interface Employee {
    email: string;
    full_name: string;
    password: string;
}

const ForgotPassword = () => {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [enteredEmail, setEnteredEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const checkEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosClient.get(`/employees/email/${enteredEmail}`);
            console.log(response.data);
            if (response.data.success) {
                setEmployee(response.data.employee);
                sendEmail(response.data.employee);
            } else {
                alert("Email not found.");
            }
        } catch (error) {
            console.error("Error checking email:", error);
            alert("Failed to check email. Please try again later.");
        }
    };

    const sendEmail = async (employeeData: Employee) => {
        setIsLoading(true);
        try {
            const decryptedPassword = await decryptPassword(employeeData.password);
            const response = await emailjs.send(
                'service_wgax0zh',
                'template_88bivwv',
                {
                    to_name: employeeData.full_name,
                    email: enteredEmail,
                    password: decryptedPassword
                },
                'd2-lxAAFU3LtpwZxO'
            );

            console.log('Email sent:', response);
            alert('Password reset email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send password reset email. Please try again later.');
        } finally {
            setIsLoading(false); // Reset loading state after email send attempt
        }
    };

    const decryptPassword = async (encryptedPassword: string | undefined) => {
        // Implement your decryption logic here
        // For example, using a decryption library or custom decryption function
        // Ensure to handle errors and edge cases appropriately
        return encryptedPassword; // Placeholder for demo purposes
    };

    return (
        <div className="center-container">
            <div className="container">
                <div className="text-center">
                    <h3><FontAwesomeIcon icon={faLock} size="4x" /></h3>
                    <h2 className="text-center">Forgot Password?</h2>
                    <p>You can reset your password here.</p>
                    <div className="panel-body">
                        <form onSubmit={checkEmail} className="form" method="post">
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
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
                                    {isLoading ? 'Checking Email...' : 'Reset Password'}
                                </button>
                            </div>
                            <input type="hidden" className="hide" name="token" id="token" value="" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
