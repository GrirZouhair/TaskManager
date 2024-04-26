import React, { useEffect } from "react";
import Employeurs from "../../components/Employeurs";
import { useNavigate } from "react-router-dom";
import TaskView from "../../components/TaskView";
import Sidebar from "../../components/SideBare";
import StatisticsChart from "../../components/StatisticsChart";

function AdminDashboard() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // });
  return (
    <>
      <div className="row mt-4 gap-5">
        <Sidebar />
        <Employeurs /> 
        <TaskView />

      </div>
      <StatisticsChart />
    </>
  );
}

export default AdminDashboard;
