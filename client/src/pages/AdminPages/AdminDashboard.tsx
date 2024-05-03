import React, { useEffect } from "react";
import Employeurs from "../../components/Employeurs";
import { useNavigate } from "react-router-dom";
import TaskView from "../../components/TaskView";
import Sidebar from "../../components/SideBare";
import StatisticsChart from "../../components/StatisticsChart";
import InfosAboutTasks from "../../components/InfosAboutTasks";
import TaskCompletionChart from "../../components/EmployeeStatistics";
function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <InfosAboutTasks />
      <div className="row mt-4 gap-5">
        <Sidebar />
        <Employeurs />
        <TaskView />
      </div>
      <div className="row justify-content-center align-items-center">
        <StatisticsChart />
        <TaskCompletionChart />
      </div>
    </>
  );
}

export default AdminDashboard;
