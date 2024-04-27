import React, { useEffect, useState } from "react";
import { axiosClient } from "../../Api/axios";
import "../../Styles/EmployeeDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowDownUpAcrossLine,
} from "@fortawesome/free-solid-svg-icons";

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
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [sortBy, sortOrder]); // Update tasks when sortBy or sortOrder changes

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
      alert("Task status updated successfully!");
      // You may want to refetch tasks here or update the specific task in the tasks array
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  return (
    <div className="px-2 pt-4 empDashboard-container">
      <h2 className="tasks--title p-3">
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
              Tache <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
            </div>
            <div
              className="col-2 text-center pointer"
              onClick={() => handleSort("created_at")}
            >
              in <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
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
              Out <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
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
        <p>Aucune tache pour le moment</p>
      )}
    </div>
  );
}

export default ClientDashboard;
