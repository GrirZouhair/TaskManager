import React, { useEffect } from "react";
import Employeurs from "../../components/Employeurs";
import { useNavigate } from "react-router-dom";
import TaskView from "../../components/TaskView";
import Sidebar from "../../components/SideBare";

<<<<<<< HEAD

=======
>>>>>>> bc844e1cbbae224afd5ecdd489f9e3f23a7d5d57
function AdminDashboard() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // });
  return (
<<<<<<< HEAD
    <div>
      <Sidebar />
      <Employeurs />
      <TaskView />
=======
    <div className="d-flex align-items-center gap-5 h-100">
      <Sidebar />
      <Employeurs />
      <TaskView />

>>>>>>> bc844e1cbbae224afd5ecdd489f9e3f23a7d5d57
    </div>
  );
}

export default AdminDashboard;
