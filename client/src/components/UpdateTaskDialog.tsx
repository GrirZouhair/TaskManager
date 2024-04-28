import React, { useState } from "react";
import { axiosClient } from "../Api/axios";
import { headers } from "../functions/getHeaders";
import "../Styles/Modal.css";

interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  deadLine: string;
}

interface Props {
  show: boolean;
  handleClose: () => void;
  task: Task | null;
  setKeepTrachChanges: any;
}

const UpdateTaskDialog: React.FC<Props> = ({
  show,
  handleClose,
  task,
  setKeepTrachChanges,
}) => {
  const [formData, setFormData] = useState<Task>({
    id: task?.id || 0,
    name: task?.name || "",
    description: task?.description || "",
    status: task?.status || "",
    deadLine: task?.deadLine || "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task) return;
    await axiosClient
      .put(`/tasks/${task.id}`, formData, { headers })
      .then((res) => alert(res.data.message))
      .catch((error) => console.error("Error updating task:", error));
    handleClose();
    setKeepTrachChanges((prev: boolean) => !prev);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Task</h5>
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
                <label htmlFor="name" className="form-label">
                  Task Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">selecter une etat</option>
                  <option value="a faire">a faire</option>
                  <option value="faire">faire</option>
                  <option value="fait">fait</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="deadLine" className="form-label">
                  Deadline
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="deadLine"
                  name="deadLine"
                  value={formData.deadLine}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskDialog;
