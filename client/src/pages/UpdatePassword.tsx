import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { axiosClient } from '../Api/axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';


function UpdatePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { email } = useParams();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            swal({
                title: "Error!",
                text: "Passwords do not match.",
                icon: "error",
                buttons: {
                    confirm: {
                        text: "ok",
                        value: true,
                    },
                },
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await axiosClient.put('/update-password', { password: newPassword, email: email });
            if (response.data.success) {
                swal({
                    title: "sucessfully",
                    text: "Password updated successfully!",
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "ok",
                            value: true,
                        },
                    },
                });
                setIsLoading(false);
                navigate('/'); // Redirect to home page or login page after updating password
            } else {
                swal({
                    title: "Error!",
                    text: "Failed to update password",
                    icon: "error",
                    buttons: {
                        confirm: {
                            text: "ok",
                            value: true,
                        },
                    },
                });
            }
        } catch (error) {
            console.error("Error updating password:", error);
            swal({
                title: "Error!",
                text: "Failed to update password. Please try again later.",
                icon: "error",
                buttons: {
                    confirm: {
                        text: "ok",
                        value: true,
                    },
                },
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="center-container">
            <div className="container">
                <div className="text-center">
                    <h3><FontAwesomeIcon icon={faLock} size="4x" /></h3>
                    <h2 className="text-center">Update Your Password?</h2>
                    <p>You can create another password here.</p>
                    <div className="panel-body">
                        <form onSubmit={handleSubmit} className="form" method="post">
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock color-blue"></i></span>
                                    <input
                                        id="newPassword"
                                        name="password"
                                        placeholder="Enter New Password"
                                        className="form-control"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock color-blue"></i></span>
                                    <input
                                        id="confirmPassword"
                                        name="password"
                                        placeholder="Confirm New Password"
                                        className="form-control"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                            <input type="hidden" className="hide" name="token" id="token" value="" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdatePassword;
