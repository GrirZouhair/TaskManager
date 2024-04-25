import { useEffect, useState } from "react";
import { axiosClient } from "../Api/axios";
import "../Styles/Modal.css";

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
      }
    };

    fetchTasks();
  }, [idEmployee, headers]);

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
            {tasks.length > 0 ? (
              <ul className="list-group">
                {tasks.map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <strong>Task Name:</strong> {task.name}
                    <br />
                    <strong>Description:</strong> {task.description}
                    <br />
                    <strong>Status:</strong> {task.status}
                    <br />
                    <strong>Deadline:</strong> {task.deadLine}
                    <br />
                    <strong>Created At:</strong> {task.created_at}
                  </li>
                ))}
              </ul>
            ) : (
              <div>No tasks found for this employee.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesTasks;
