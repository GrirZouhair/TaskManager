import React, { useEffect, useRef, useState } from "react";
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
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useLogedInContext } from "../../provider/logedInUser";

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
  const [selectedTask, setSelectedTask] = useState<Task>();
  const fileRef: any = useRef();
  const navigate = useNavigate();
  const { setlogedIN }: any = useLogedInContext();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    setlogedIN("employee");
  }, [navigate]);
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
      swal({
        title: "sucessfully",
        text: "Statut de la tâche mis à jour avec succès !",
        icon: "success",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
          },
        },
      });
    } catch (error) {
      console.log("Erreur lors de la mise à jour de la tâche :", error);
    }
  };

  const handelUploadFileCall = (task: Task) => {
    setSelectedTask(task);
    fileRef.current.click();
  };

  const handelFileChange = async () => {
    const file = fileRef.current.files[0]; // Get the uploaded file
    if (!file) return; // Exit if no file selected

    // Read the file as a data URL (Base64 encoded)
    const reader: any = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const fileData = reader.result.split(",")[1]; // Extract base64 data
      const allowedExtensions = [
        "png",
        "jpeg",
        "svg",
        "jpg",
        "pdf",
        "xls",
        "xlsx",
      ];
      const fileExtension = file.name.split(".").pop().toLowerCase(); // Extract file extension

      if (!allowedExtensions.includes(fileExtension)) {
        swal({
          title: "warining!",
          text: "file extenstion is not accepted",
          icon: "warning",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
            },
          },
        });
        return;
      }
      const payload = {
        prof_document: fileData,
        fileExtension: fileExtension, // Pass the file extension to the backend
      };

      try {
        await axiosClient.put(
          `/task/upload/${selectedTask?.id}`,
          payload, // Pass the payload with Base64 data and file extension
          {
            headers: {
              ...headers,
              "Content-Type": "application/json", // Use JSON content type
            },
          }
        );
        swal({
          title: "sucessfully",
          text: "le document est mis à jour avec succès !",
          icon: "success",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
            },
          },
        });
        // Perform any additional actions after successful file upload
      } catch (error) {
        console.error("Error uploading file:", error);
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
  };

  return (
    <div className="px-2 pt-4 empDashboard-container">
      <HeaderEmployee />
      <EmployeeAlertMessage />
      <input
        type="file"
        ref={fileRef}
        className="d-none"
        onChange={handelFileChange}
      />
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
              Statut
              <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
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
                      : task.status === "revoir"
                      ? "task__done"
                      : ""
                  }`}
                  onChange={(e) => handleChangeStatus(e, task)}
                  value={task.status}
                >
                  <option value="a faire">a faire</option>
                  <option value="faire">faire</option>
                  <option value="revoir">revoir</option>
                </select>
                <div className="col-2">{task.deadLine}</div>
                <div className="col-1 text-center p-2 submit__task pointer">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    onClick={() => handelUploadFileCall(task)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-100 mx-auto m-5 fw-bold">
          Aucune tâche pour le moment.
        </div>
      )}
    </div>
  );
}

export default ClientDashboard;
