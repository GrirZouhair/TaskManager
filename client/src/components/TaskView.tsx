import React, { useState } from "react";
import "../Styles/TaskView.css";

interface Task {
  idEmployee: number;
  id: number;
  email: string;
  full_name: string;
  gender: string;
  name: string;
  description: string;
  status: string | undefined; // Changed type to string | undefined
  deadLine: string; // Changed type to string
  created_at: string;
}

const TaskView = () => {
  const [tasks, setTasks] = useState<Task[]>([
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
      status: "faire",
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
      status: "fait",
      deadLine: "2024-04-18",
      created_at: "2024-04-10 14:10:20"
    },
    {
      idEmployee: 8,
      id: 4,
      email: "jane.smith@example.com",
      full_name: "Jane Smith",
      gender: "female",
      name: "Research Project",
      description: "scientific study",
      status: "a faire",
      deadLine: "2024-05-05",
      created_at: "2024-04-15 11:20:00"
    }
  ]);

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
    }
    else if (status === "fait") {
      return <span style={{ color: "red" }}>Fait</span>; // Return JSX for colored status
    } else {
      return <span>{status}</span>; // Default status
    }
  };

  return (
    <div className="parent col-4" >
      <div className="child" style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <h3 className="pointer text-center mb-4">Tasks</h3>
        {tasks.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Description</th>
                <th scope="col">Created At</th>
                <th scope="col">Ended At</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="text-center">{task.full_name}</td>
                  <td className="text-center">{task.description}</td>
                  <td className="text-center">{formatDateByDays(task.created_at)}</td>
                  <td className="text-center">{formatDateByDays(task.deadLine)}</td>
                  <td className="text-center">{deadLineColor(task.status, task.deadLine)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TaskView;
