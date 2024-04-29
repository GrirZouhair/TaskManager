import React, { useEffect, useState } from "react";
import { axiosClient } from "../../Api/axios";
import "../../Styles/EmployeeDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowDownUpAcrossLine,
} from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import HeaderEmployee from "../../components/HeaderEmployee";
import EmployeeAlertMessage from "../../components/EmployeeAlertMessage";
import { headers } from "../../functions/getHeaders";
import swal from "sweetalert";

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
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [keepTrackChanges, setKeepTrackChanges] = useState<boolean>(false);
  const employee = JSON.parse(localStorage.getItem("employee") || "{}");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosClient.get(`/tasks/${employee.id}`, {
          headers,
        });

        // Sort tasks based on sortBy and sortOrder
        const sortedTasks = response.data.task.sort((a: any, b: any) => {
          if (sortOrder === "asc") {
            return a[sortBy].localeCompare(b[sortBy]);
          } else {
            return b[sortBy].localeCompare(a[sortBy]);
          }
        });

        setTasks(sortedTasks);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    fetchTasks();
  }, [keepTrackChanges]);

  useEffect(() => {
    checkDeadlines(tasks);
  }, [tasks]);

  const checkDeadlines = (tasks: Task[]) => {
    const today = new Date();
    const deadlineApproachingTasks = tasks.filter((task) => {
      const deadlineDate = new Date(task.deadLine);
      const timeDifference = deadlineDate.getTime() - today.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return daysDifference <= 2; // Change this threshold as needed
    });
    if (deadlineApproachingTasks.length > 0) {
      console.log("Échéances approchantes pour les tâches suivantes:");
      deadlineApproachingTasks.forEach((task) => {
        console.log(`Task Name: ${task.name}, Deadline: ${task.deadLine}`);
        task.status !== "fait" &&
          emailjs
            .send(
              "service_l2cwpth",
              "template_1zchqgc",
              {
                task_id: task.id,
                to_name: employee.full_name,
                taskName: task.name,
                deadLine: task.deadLine,
                email: employee.email,
              },
              {
                publicKey: "b928A0_fmCGD2jNFH",
              }
            )
            .then(
              () => {
                console.log("SUCCESS!");
              },
              (error) => {
                console.log("FAILED...", error.text);
              }
            );
      });
    } else {
      console.log("Aucune échéance approchante.");
    }
  };

  const handleSort = (field: string) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleChangeStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    task: Task
  ) => {
    const updatedTask = { ...task, status: e.target.value };

    try {
      await axiosClient.put(`tasks/${updatedTask.id}`, updatedTask, {
        headers,
      });
      setKeepTrackChanges((prev) => !prev);
      alert("Task status updated successfully!");
      // You may want to refetch tasks here or update the specific task in the tasks array
    } catch (error) {
      console.log("Erreur lors de la mise à jour de la tâche :", error);
    }
  };

  return (
    <div className="px-2 pt-4 empDashboard-container">
      <HeaderEmployee />
      <EmployeeAlertMessage />
      <h2 className="tasks--title p-3 mt-5">
        {" "}
        Vos Taches{" "}
        <span className="text-light bg-dark rounded-circle px-3 py-2">
          {tasks.length}
        </span>
      </h2>
      {tasks.length > 0 ? (
        <div className="h-100 w-100 tasks--viwer-container">
          <div className="row p-3">
            <div
              className="col-4 text-center pointer"
              onClick={() => handleSort("name")}
            >
              Tâche <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
            </div>
            <div
              className="col-2 text-center pointer"
              onClick={() => handleSort("created_at")}
            >
              Dans <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
            </div>
            <div
              className="col-2 text-center pointer"
              onClick={() => handleSort("status")}
            >
              Status <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
            </div>
            <div
              className="col-1 text-center pointer"
              onClick={() => handleSort("deadLine")}
            >
              Hors <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
            </div>
          </div>
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
                    task.status === "a faire"
                      ? "task__new"
                      : task.status === "fait"
                      ? "task__done"
                      : ""
                  }`}
                  onChange={(e) => handleChangeStatus(e, task)}
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
        <p>Aucune tâche pour le moment.</p>
      )}
    </div>
  );
}

export default ClientDashboard;
