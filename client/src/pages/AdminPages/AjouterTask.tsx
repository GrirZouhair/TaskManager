import React, { useEffect, useState } from "react";
import { axiosClient } from "../../Api/axios";
import TasksImage from "../../assets/tasksImage.png";
import Sidebar from "../../components/SideBare";
import swal from "sweetalert";
import { headers } from "../../functions/getHeaders";

type FormData = {
  idEmployee: number | string;
  name: string;
  description: string;
  status: string;
  deadLine: Date | string;
  date_assignment: Date | string;
};

type Employee = {
  id: number | string;
  full_name: string;
  email: string;
  gender: string;
};

function AjouterTask() {
  const [formData, setFormData] = useState<FormData>({
    idEmployee: "",
    name: "",
    description: "",
    status: "a faire",
    deadLine: "",
    date_assignment: new Date().toISOString().slice(0, 10),
  });
  const [employees, setEmployees] = useState<Array<Employee>>();

  useEffect(() => {
    try {
      axiosClient.get("/employees", { headers }).then((response) => {
        setEmployees(response.data.employee);
      });
    } catch (err) {
      console.log(err);
      swal({
        title: "Error!",
        text: "something went wrong while fetching employee",
        icon: "error",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
          },
        },
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelSubmit = async (e: any) => {
    e.preventDefault();
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      //await axiosClient.get("/sanctum/csrf-cookie");
      const response = await axiosClient.post("/tasks/store", formData, {
        headers,
      });
      swal({
        title: "sucessfully",
        text: response.data.message,
        icon: "success",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
          },
        },
      });
    } catch (err) {
      console.log(err);
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
    <div className="row">
      <Sidebar />
      <div className="grid-container col-10">
        <div className="p-5">
          <div>
            <img src={TasksImage} className="img2" alt="Tasks" />
          </div>
          <div className="form-group mt-4">
            <label className="form-label">Nom de la tâche</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group mt-4">
            <label className="form-label">Description de la tâche</label>
            <input
              type="text"
              className="form-control"
              name="description"
              onChange={handleChange}
            />
          </div>

          <div className="form-group mt-4">
            <label className="form-label">Date limite</label>
            <input
              type="date"
              className="form-control"
              name="deadLine"
              onChange={handleChange}
            />
          </div>

          <div className="form-group mt-4">
            <label className="form-label">Sélectionner un employé</label>
            <select
              className="form-select"
              name="idEmployee"
              onChange={handleChange}
            >
              <option value="">Sélectionnez un employé</option>
              {employees &&
                employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.full_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="button mt-5">
            <button id="retour" type="button">
              Retourner
            </button>
            <button type="submit" id="continue" onClick={handelSubmit}>
              Continue
            </button>
          </div>
        </div>
        <img
          src="image17.png"
          className="w-100 h-100 d-none d-md-block"
          alt="Background"
        />
      </div>
    </div>
  );
}

export default AjouterTask;
