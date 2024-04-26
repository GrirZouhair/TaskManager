import { useEffect, useState } from "react";
import { axiosClient } from "../../Api/axios";
import "../../Styles/EmployeeDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  deadLine: string;
  created_at: string;
}

function ClientDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  let status = "";
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const idEmployee = JSON.parse(localStorage.getItem("employee") || "{}");

        const response = await axiosClient.get(`/tasks/${idEmployee.id}`, {
          headers,
        });
        setTasks(response.data.task);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [status]);

  const handelChange = async (e: any, task: Task) => {
    status = e.target.value;
    const updatedTask = { ...task, status: status };
    console.log(updatedTask);
    try {
      await axiosClient
        .put(`tasks/${updatedTask.id}`, updatedTask, { headers })
        .then((response) => alert(response.data.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 pt-4 empDashboard-container">
      <h2 className="tasks--title p-3">
        {" "}
        Vous Taches{" "}
        <span className="text-light bg-dark rounded-circle px-3 py-2">
          {tasks.length}
        </span>
      </h2>
      {tasks.length > 0 ? (
        <div className="h-100 w-100 tasks--viwer-container ">
          {tasks.map((task) => (
            <div key={task.id} className="mb-5">
              <div className="row align-items-center p-3 justify-content-start Task__hover__effect">
                <div className="col-4 d-flex flex-column justify-content-start align-items-start">
                  <div className="h4">{task.name}</div>
                  <div className="">{task.description}</div>
                </div>
                <div className="col-2">{task.created_at}</div>
                <select
                  className={`col-2 form-select border__color mx-4 p-2 text-center ${
                    task.status == "a faire"
                      ? "task__new"
                      : task.status == "fait"
                      ? "task__done"
                      : ""
                  }`}
                  onChange={(e) => handelChange(e, task)}
                  value={task.status}
                >
                  <option value="a faire">a faire</option>
                  <option value="faire">faire</option>
                  <option value="fait">fait</option>
                </select>
                <div className="col-2">{task.deadLine}</div>
                <div className="col-1 text-center p-2 submit__task pointer">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucan tache au se moment</p>
      )}
    </div>
  );
}

export default ClientDashboard;
