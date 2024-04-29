import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { LogOut } from "../functions/logOut";
import "../Styles/HeaderEmployee.css";

type Employee = {
  id: number;
  full_name: string;
  email: string;
  gender: string;
};

const HeaderEmployee: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const employeeString = localStorage.getItem("employee");
    if (employeeString) {
      const employee = JSON.parse(employeeString) as Employee;
      setEmployeeData(employee);
    }
  }, []);

  const toggleSidebar = (): void => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSidebarPassword = (): void => {
    navigate("/changePassword");
  };

  const handleSidebarEmail = (): void => {
    navigate("/changeEmail");
  };

  return (
    <div className="employee-dashboard col-12">
      <div className="container-1 p-4 w-100 d-flex">
        <div className="container-2">
          <img className="image-34" src="Image34.png" alt="Image34" />
          <div className="bonjour">
            Bonjour{" "}
            {employeeData && employeeData.gender === "female"
              ? "Madame"
              : "Monsieur"}{" "}
            {employeeData && employeeData.full_name}
          </div>
        </div>
        <div style={{ alignSelf: "flex-end" }} className="d-flex gap-3 p-2">
          <IoMdHome
            className="gearIcon pointer"
            onClick={() => navigate("/employeeDashboard")}
          />
          <img
            className="gearIcon"
            src="Image32.png"
            alt="Image32"
            onClick={toggleSidebar}
          />
        </div>
      </div>
      <div className="line-2"></div>
      {sidebarVisible && (
        <div className="sidebar" onClick={toggleSidebar}>
          <div className="sidebar-item" onClick={handleSidebarEmail}>
            Changer l'email
          </div>
          <div className="sidebar-item" onClick={handleSidebarPassword}>
            Changer le mot de passe
          </div>
          <div className="sidebar-item" onClick={() => LogOut("employee")}>
            Déconnexion
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderEmployee;
