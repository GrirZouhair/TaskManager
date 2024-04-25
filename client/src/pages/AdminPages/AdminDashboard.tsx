import React, { useEffect } from "react";
import Employeurs from "../../components/Employeurs";
import { useNavigate } from "react-router-dom";
import TaskView from "../../components/TaskView";
import Sidebar from "../../components/SideBare";


function AdminDashboard() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // });
  return (
    <div className="row mt-4">
      <Sidebar />
      <Employeurs />
      <TaskView /> 
    </div>
  );
}

export default AdminDashboard;
