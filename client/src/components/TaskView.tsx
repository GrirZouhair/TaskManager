import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { finishedTasks } from "../functions/getTasks";
import swal from "sweetalert";
import "../Styles/TaskView.css";

interface Task {
  idEmployee: number;
  id: number;
  email: string;
  full_name: string;
  gender: string;
  name: string;
  description: string;
  status: string | undefined;
  deadLine: string;
  created_at: string;
}

const TaskView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const Redirect = () => {
    navigate("/manageTasks");
  };
  useEffect(() => {
    try {
      const fetchData = async () => {
        const tasks = await finishedTasks();
        setTasks(tasks);
      };
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
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
  }, []);

  const formatDateByDays = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const deadLineColor = (status: string | undefined, deadLine: string) => {
    const todayDate = new Date().toISOString().slice(0, 10);
    const taskDeadLine = new Date(deadLine).toISOString().slice(0, 10);

    if (status === "a faire" && todayDate !== taskDeadLine) {
      return <span style={{ color: "green" }}>A Faire</span>; // Return JSX for colored status
    } else if (status === "faire" && todayDate !== taskDeadLine) {
      return <span style={{ color: "blue" }}>Faire</span>;
    } else if (status === "fait") {
      return <span style={{ color: "red" }}>Fait</span>; // Return JSX for colored status
    } else {
      return <span>{status}</span>; // Default status
    }
  };
  return (
    <div className="parent col-8 col-lg-4 mx-auto">
      <div
        className="child"
        style={{
          backgroundColor: "#FFFFFF",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="pointer text-center mb-4" onClick={Redirect}>
          Tâches
        </h3>
        {tasks && tasks.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nom de tach</th>
                <th scope="col">Créé le</th>
                <th scope="col">Terminé le</th>
                <th scope="col">Statut</th>
              </tr>
            </thead>
            <tbody>
              {tasks &&
                tasks.length > 0 &&
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="text-center">{task.name}</td>
                    <td className="text-center">
                      {formatDateByDays(task.created_at)}
                    </td>
                    <td className="text-center">
                      {formatDateByDays(task.deadLine)}
                    </td>
                    <td className="text-center">
                      {deadLineColor(task.status, task.deadLine)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            {" "}
            il n'y a aucune tâche terminée{" "}
            <span onClick={Redirect}>gérer d'autres tâches</span>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskView;
