import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminPages/AdminDashboard";
import AjouterEmployee from "../pages/AdminPages/AjouterEmployee";
import EmployeeDashboard from "../pages/EmployeePages/EmployeeDashboard";
import AjouterTask from "../pages/AdminPages/AjouterTask";
import ChangePassword from "../pages/AdminPages/ChangePassword";
import ManageEmployees from "../pages/AdminPages/ManageEmployees";
import SignUp from "../pages/AdminPages/SignUp";
import LogInPage from "../pages/LogInPage";
import ChangerEmail from "../pages/AdminPages/ChangerEmail";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
  {
    path: '/changeEmail',
    element: <ChangerEmail />
  },
  {
    path: "/ajouterTask",
    element: <AjouterTask />,
  },
  {
    path: "/ajouterEmployee",
    element: <AjouterEmployee />,
  },
  {
    path: "/",
    element: <LogInPage />,
  },
  {
    path: "/adminDashbord",
    element: <AdminDashboard />,
  },
  {
    path: "/manageEmployees",
    element: <ManageEmployees />,
  },
  {
    path: "/employeeDashboard",
    element: <EmployeeDashboard />,
  },
  {
    path: "*",
    element: <p>not Found</p>,
  },
]);
