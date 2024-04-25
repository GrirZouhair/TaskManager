import React, { useState } from "react";
import "../Styles/TaskView.css";

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
    <div className="container">
      <div className="parent">
        <div className="child">
          <table>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.id}</td>
                <td>{task.full_name}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.deadLine}</td>
                <td>{formatDateByDays(task.created_at)} Days</td>
                <td>
                  <ToggleButton />
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
