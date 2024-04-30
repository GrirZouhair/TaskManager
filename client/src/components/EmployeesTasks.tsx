import { useEffect, useState } from "react";
import { axiosClient } from "../Api/axios";
import "../Styles/Modal.css";
import swal from "sweetalert";

interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  deadLine: string;
  created_at: string;
}

interface EmployeesTasksProps {
  show: boolean;
  handleClose: () => void;
  idEmployee: number;
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
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosClient.get(`/tasks/${idEmployee}`, { headers });
        setTasks(res.data.task);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        swal({
          title: "Error!",
          text: "something went wrong while fetching tasks",
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

    fetchTasks();
  }, [idEmployee, headers]);

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tâches de l'employé</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {tasks.length > 0 ? (
              <ul className="list-group">
                {tasks.map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <strong>Nom de la tâche:</strong> {task.name}
                    <br />
                    <strong>Description:</strong> {task.description}
                    <br />
                    <strong>Statut:</strong> {task.status}
                    <br />
                    <strong>Date limite:</strong> {task.deadLine}
                    <br />
                    <strong>Créé le:</strong> {task.created_at}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Aucune tâche n'a été trouvée pour cet employé.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesTasks;
