import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/SideBare";
import { fetchTasks } from "../../functions/getTasks";
import { IoPerson } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  deadLine: string;
  created_at: string;
}

function ManageTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState<{
    field: string;
    order: "asc" | "desc";
  }>({ field: "", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    fetchData();
  }, []);

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
                  <th scope="col">Description</th>
                  <th scope="col">Date de assinement </th>
                  <th scope="col">Status</th>
                  <th scope="col">Deadline</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td title={task.description}>
                      {shourtenDescription(task.description)}
                    </td>
                    <td>{task.created_at}</td>
                    <td>{task.status}</td>
                    <td>{task.deadLine}</td>
                    <td className="d-flex gap-4">
                      <FaTasks
                        className="col-2 icon pointer text-info"
                        // onClick={() => handleEmployeesTasks(employee)}
                      />

                      <FaUserEdit
                        className="col-2 icon pointer text-primary"
                        // onClick={() => handleEditUser(employee)}
                      />

                      <TiDelete
                        className="col-2 icon pointer text-danger"
                        //onClick={() => handleDelete(employee.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageTasks;
