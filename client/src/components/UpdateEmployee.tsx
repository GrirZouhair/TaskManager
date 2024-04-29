import React, { useState } from "react";
import { axiosClient } from "../Api/axios";
import "../Styles/Modal.css";
import swal from "sweetalert";

interface User {
  id: number;
  full_name: string | null;
  email: string | null;
  gender: string | null;
}

interface Props {
  show: boolean;
  handleClose: () => void;
  user: User | null;
  setKeepTrackChanges: (arg: any) => void;
}

const UpdateUserDialog: React.FC<Props> = ({
  show,
  handleClose,
  user,
  setKeepTrackChanges,
}) => {
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    gender: user?.gender || null, // Add a gender field in formData
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return; // Check if user is null before making API call
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      await axiosClient
        .put(`/employee/update/${user.id}`, formData, { headers })
        .then((res) =>
          swal({
            title: "sucessfully",
            text: res.data.message,
            icon: "success",
            buttons: {
              confirm: {
                text: "OK",
                value: true,
              },
            },
          })
        )
        .catch((error) => console.error("Error updating employee:", error));
      setKeepTrackChanges((prev: any) => !prev);
      handleClose();
    } catch (e) {
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
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Mettre à jour l'employé</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="full_name" className="form-label">
                  Nom Complet
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Genre
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez votre sexe</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Mettre à jour
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserDialog;
