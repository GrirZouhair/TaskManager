import React, { useState } from "react";
import "../Styles/TaskView.css";
import { IoPerson } from "react-icons/io5";

const TaskView = () => {
  const [tasks, setTasks] = useState([
    {
      idEmployee: 13,
      id: 1,
      email: "clovis.dibbert@example.com",
      full_name: "Savion Dickinson",
      gender: "female",
      name: "IDOFTASSILA",
      description: "judo",
      status: "a faire",
      deadLine: "2024-04-23",
      created_at: "2024-04-22 12:25:05"
    },
    {
      idEmployee: 13,
      id: 1,
      email: "clovis.dibbert@example.com",
      full_name: "Savion Dickinson",
      gender: "female",
      name: "IDOFTASSILA",
      description: "judo",
      status: "a faire",
      deadLine: "2024-04-23",
      created_at: "2024-04-22 12:25:05"
    },
    {
      idEmployee: 27,
      id: 2,
      email: "alisha.king@example.com",
      full_name: "Alisha King",
      gender: "female",
      name: "Project X",
      description: "software development",
      status: "in progress",
      deadLine: "2024-05-15",
      created_at: "2024-04-20 09:45:30"
    },
    {
      idEmployee: 42,
      id: 3,
      email: "mario.rossi@example.com",
      full_name: "Mario Rossi",
      gender: "male",
      name: "Marketing Campaign",
      description: "social media ads",
      status: "completed",
      deadLine: "2024-04-18",
      created_at: "2024-04-10 14:10:20"
    }

  ]);

  const formatDateByDays = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const ToggleButton = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
      setIsChecked((prevState) => !prevState);
    };

    return (
      <button
        className={isChecked ? "toggle-button checked" : "toggle-button"}
        onClick={handleToggle}
      >
        <span>Faire</span>
      </button>
    );
  };

  return (
    <div className="parent" style={{ width: "800px" }}>
      <div className="child row align-items-center gap-2" style={{ backgroundColor: "#FFFFFF" }}>
        <h3 className="pointer text-center">Tasks</h3>
        {tasks.length > 0 &&
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Full Name</th>
                  <th>Description</th>
                  <th>deadLine</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <div className="col-3 icon pointer text-center align-middle">
                      <IoPerson />
                    </div>
                    <td className="text-center align-middle">{task.full_name}</td>
                    <td className="text-center align-middle">{task.description}</td>
                    <td className="text-center align-middle">{formatDateByDays(task.deadLine)}</td>
                    <td className="text-center align-middle">
                      <ToggleButton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>


  );
};

export default TaskView;
