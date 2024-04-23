import React, { useEffect } from "react";
import Employeurs from "../../components/Employeurs";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });
  return (
    <div>
      <Employeurs />
    </div>
  );
}

export default AdminDashboard;
