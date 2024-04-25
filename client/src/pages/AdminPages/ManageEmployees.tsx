import { useEffect, useState } from "react";
import { axiosClient } from "../../Api/axios";
import BackHome from "../../components/BackHome";
import { IoPerson } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import UpdateUserDialog from "../../components/UpdateEmployee";
import EmployeesTasks from "../../components/EmployeesTasks";
import "../../Styles/ManageEmployee.css";

interface Employee {
  id: number;
  full_name: string;
  email: string | null;
  gender: string | null;
}

interface EmployeesTasksProps {
  show: boolean;
  handleClose: () => void;
  idEmployee: number;
  headers: {
    Accept: string;
    Authorization: string;
  };
}

function ManageEmployees() {
  const [employeurs, setEmployeurs] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showEmployeesTasks, setShowEmployeesTasks] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Employee | null>(null);

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosClient.get("/employees", {
          headers,
        });
        setEmployeurs(res.data.employee);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Retry the request after a delay (e.g., 5 seconds)
        setTimeout(fetchEmployees, 5000);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      axiosClient
        .delete(`/employee/delete/${id}`, { headers })
        .then((res) => alert(res.data.Message))
        .catch((error) => console.error("Error deleting employee:", error));
    }
  };

  const filteredEmployees = employeurs.filter((employee) => {
    const name = employee.full_name && employee.full_name.toLowerCase();
    const email = employee.email ? employee.email.toLowerCase() : "";
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (employee.full_name && name.includes(searchTermLower)) ||
      email.includes(searchTermLower)
    );
  });

  const handleEditUser = (user: Employee) => {
    setSelectedUser(user);
    setShowUpdateDialog(true);
  };

  const handleEmployeesTasks = (emp: Employee) => {
    setSelectedUser(emp);
    setShowEmployeesTasks(true);
  };

  return (
    <div className="row">
      <BackHome />
      <div className="col-12 employee-page-container">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search employees by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <div
              className="employee-container row align-items-center justify-content-center"
              key={employee.id}
            >
              <div className="col-2 icon pointer">
                <IoPerson />
              </div>
              <div className="col-2">{employee.full_name}</div>
              <div className="col-2">
                {employee.email ? employee.email : ""}
              </div>
              <div
                className="col-2 icon pointer text-info"
                onClick={() => handleEmployeesTasks(employee)}
              >
                <FaTasks />
              </div>
              <div
                className="col-2 icon pointer text-primary"
                onClick={() => handleEditUser(employee)}
              >
                <FaUserEdit />
              </div>
              <div
                className="col-2 icon pointer text-danger"
                onClick={() => handleDelete(employee.id)}
              >
                <TiDelete />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No employees found.</div>
        )}
        {showUpdateDialog && (
          <UpdateUserDialog
            show={showUpdateDialog}
            handleClose={() => setShowUpdateDialog(false)}
            user={selectedUser}
          />
        )}
        {showEmployeesTasks && (
          <EmployeesTasks
            show={showEmployeesTasks}
            handleClose={() => setShowEmployeesTasks(false)}
            idEmployee={selectedUser?.id || 0}
            headers={headers}
          />
        )}
      </div>
    </div>
  );
}

export default ManageEmployees;
