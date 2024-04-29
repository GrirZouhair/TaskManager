import React, { useEffect, useState } from "react";
import { axiosClient } from "../Api/axios";
import "../Styles/Modal.css";
import swal from "sweetalert";

interface Employee {
  id: number;
  full_name: string;
  email: string;
  gender: string;
}

interface EmployeesTasksProps {
  show: boolean;
  handleClose: () => void;
  idEmployee: number | null;
  headers: {
    Accept: string;
    Authorization: string;
  };
}

const EmployeesTasks: React.FC<EmployeesTasksProps> = ({
  show,
  handleClose,
  idEmployee,
  headers,
}) => {
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchTasksAndEmployee = async () => {
      try {
        const resEmployee = await axiosClient.get(`/employee/${idEmployee}`, {
          headers,
        });
        setEmployee(resEmployee.data.employee);
      } catch (error) {
        console.error("Error fetching tasks and employee:", error);
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
    };

    fetchTasksAndEmployee();
  }, [idEmployee]);

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Employee Tasks</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <h6>Informations sur l'employé:</h6>
              {employee ? (
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>ID:</strong> {employee.id}
                  </li>
                  <li className="list-group-item">
                    <strong>Nom:</strong> {employee.full_name}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {employee.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Genre:</strong> {employee.gender}
                  </li>
                </ul>
              ) : (
                <div>Aucun employé trouvé pour cette tâche.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesTasks;
