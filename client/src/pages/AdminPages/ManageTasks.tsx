import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/SideBare";
import { axiosClient } from "../../Api/axios";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import UpdateTaskDialog from "../../components/UpdateTaskDialog";
import EmployeesTasks from "../../components/TasksForEmployee"; // Import EmployeesTasks component
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { GrDocumentVerified } from "react-icons/gr";

interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  deadLine: string;
  created_at: string;
  idEmployee: number;
  prof_document: string;
}

function ManageTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState<{
    field: string;
    order: "asc" | "desc";
  }>({ field: "", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showEmployeesTasks, setShowEmployeesTasks] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [keepTrachChanges, setKeepTrachChanges] = useState(false);
  const navigate = useNavigate();

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const userItem = localStorage.getItem("user");
  const userId = userItem ? JSON.parse(userItem).id : null;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const res = await axiosClient.get(`/tasks/all/${userId}`, {
            headers,
          });
          setTasks(res.data.task);
        } catch (error) {
          console.error("Erreur lors de la récupération des employés:", error);
        }
      };
      fetchData();
    } catch (e) {
      console.error("Error fetching tasks:", e);
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
  }, [keepTrachChanges]);

  const shourtenDescription = (desc: string) => {
    return desc.substring(0, 20) + " ...";
  };

  const handleSort = (field: string) => {
    setSortBy((prevState) => ({
      field,
      order:
        prevState.field === field && prevState.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowUpdateModal(true);
  };

  const handleEmployeesTasks = (task: Task) => {
    setSelectedTaskId(task.idEmployee);
    setShowEmployeesTasks(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        axiosClient
          .delete(`/tasks/${id}`, { headers })
          .then((res) =>
            swal({
              title: "sucessfully",
              text: res.data.message,
              icon: "success",
              buttons: {
                confirm: {
                  text: "OK",
                  value: true,
                },
              },
            })
          )
          .catch((error) => console.error("Error deleting task:", error));
        setKeepTrachChanges((prev) => !prev);
      } catch (error) {
        console.error("Error deleting task:", error);
        swal({
          title: "Error!",
          text: "something went wrong while deleting task",
          icon: "error",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
            },
          },
        });
      }
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = filteredTasks
    .filter((task) => selectedStatus === "" || task.status === selectedStatus)
    .sort((a, b) => {
      if (sortBy.field === "created_at" || sortBy.field === "deadLine") {
        return sortBy.order === "asc"
          ? a[sortBy.field].localeCompare(b[sortBy.field])
          : b[sortBy.field].localeCompare(a[sortBy.field]);
      }
      return 0;
    });

  return (
    <div className="row">
      <Sidebar />
      <div className="col-10 p-3">
        <div className="row align-items-center mb-5">
          <div className="col-5">
            <input
              type="search"
              placeholder="nom ou description de tach"
              className="form-control "
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div
            className="col-2 text-center pointer"
            onClick={() => handleSort("created_at")}
          >
            in <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
          </div>
          <div className="col-2 d-flex align-items-center gap-3 text-center pointer">
            <select
              onChange={handleStatusChange}
              className="form-select text-center"
            >
              <option value="">Tous les statuts</option>
              <option value="a faire">A Faire</option>
              <option value="faire">En Cours</option>
              <option value="revoir">revoir</option>
              <option value="fait">Fait</option>
            </select>{" "}
          </div>
          <div
            className="col-2 text-center pointer"
            onClick={() => handleSort("deadLine")}
          >
            Out <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
          </div>
        </div>
        <div>
          {sortedTasks.length > 0 && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Date d'assignation </th>
                  <th scope="col">Statut</th>
                  <th scope="col">Date limite</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <p>{task.name}</p>
                      <p title={task.description}>
                        {shourtenDescription(task.description)}
                      </p>
                    </td>
                    <td>{task.created_at}</td>
                    <td>{task.status}</td>
                    <td>{task.deadLine}</td>
                    <td>
                      {task.prof_document && (
                        <a
                          href={
                            "https://taskmanagerapi-production-a5e3.up.railway.app/storage/documents/" +
                            task.prof_document
                          }
                          className="pointer"
                          target="_blank"
                        >
                          <GrDocumentVerified className="h-100 w-100 pointer text-info" />
                        </a>
                      )}
                    </td>
                    <td className="">
                      <BsFillPersonVcardFill
                        className="icon pointer text-info"
                        onClick={() => handleEmployeesTasks(task)}
                      />
                    </td>
                    <td>
                      <FiEdit
                        className="icon pointer text-primary"
                        onClick={() => handleEditTask(task)}
                      />
                    </td>
                    <td>
                      <TiDelete
                        className="icon pointer text-danger"
                        onClick={() => handleDelete(task.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showUpdateModal && (
        <UpdateTaskDialog
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          task={selectedTask}
          setKeepTrachChanges={setKeepTrachChanges}
        />
      )}
      {showEmployeesTasks && (
        <EmployeesTasks
          show={showEmployeesTasks}
          handleClose={() => setShowEmployeesTasks(false)}
          idEmployee={selectedTaskId}
          headers={headers}
        />
      )}
    </div>
  );
}

export default ManageTasks;
