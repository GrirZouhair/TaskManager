import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminPages/AdminDashboard";
import AjouterEmployee from "../pages/AdminPages/AjouterEmployee";
import EmployeeDashboard from "../pages/EmployeePages/EmployeeDashboard";
import AjouterTask from "../pages/AdminPages/AjouterTask";
import ChangePassword from "../pages/ChangePassword";
import ManageEmployees from "../pages/AdminPages/ManageEmployees";
import ManageTasks from "../pages/AdminPages/ManageTasks";
import LogInPage from "../pages/LogInPage";
import ChangeEmail from "../pages/ChangeEmail";
import Register from "../pages/RegisterPage";
import ForgottenPassword from "../pages/ForgottenPassword";
import UpdatePassword from "../pages/UpdatePassword";
import Logout from "../components/Logout";

export const router = createBrowserRouter([
  {
    path: "/update-password/:email",
    element: <UpdatePassword />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
  {
    path: "/forgottenpassword",
    element: <ForgottenPassword />,
  },
  {
    path: "/changeEmail",
    element: <ChangeEmail />,
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
    path: "/manageTasks",
    element: <ManageTasks />,
  },
  {
    path: "/employeeDashboard",
    element: <EmployeeDashboard />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <p>not Found</p>,
  },
]);
