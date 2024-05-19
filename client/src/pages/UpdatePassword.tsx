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
                title: "Erreur!",
                text: "Les mots de passe ne correspondent pas.",
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
                    title: "Succès",
                    text: "Mot de passe mis à jour avec succès!",
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "ok",
                            value: true,
                        },
                    },
                });
                setIsLoading(false);
                navigate('/'); // Rediriger vers la page d'accueil ou la page de connexion après la mise à jour du mot de passe
            } else {
                swal({
                    title: "Erreur!",
                    text: "Impossible de mettre à jour le mot de passe",
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
            console.error("Erreur lors de la mise à jour du mot de passe:", error);
            swal({
                title: "Erreur!",
                text: "Impossible de mettre à jour le mot de passe. Veuillez réessayer plus tard.",
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
                    <h2 className="text-center">Mettre à Jour Votre Mot de Passe?</h2>
                    <p>Vous pouvez créer un autre mot de passe ici.</p>
                    <div className="panel-body">
                        <form onSubmit={handleSubmit} className="form" method="post">
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock color-blue"></i></span>
                                    <input
                                        id="newPassword"
                                        name="password"
                                        placeholder="Entrez le Nouveau Mot de Passe"
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
                                        placeholder="Confirmez le Nouveau Mot de Passe"
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
                                    {isLoading ? 'Mise à Jour...' : 'Mettre à Jour'}
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