import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminPages/AdminDashboard";
import AjouterEmployee from "../pages/AdminPages/AjouterEmployee";
import EmployeeDashboard from "../pages/EmployeePages/EmployeeDashboard";
import AjouterTask from "../pages/AdminPages/AjouterTask";
import ChangePassword from "../pages/AdminPages/ChangePassword";
import SignUp from "../pages/AdminPages/SignUp";
import LogInPage from "../pages/LogInPage";

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
    path: "/employeeDashboard",
    element: <EmployeeDashboard />,
  },
  {
    path: "*",
    element: <p>not Found</p>, // replace with  something else like page to show the error
  },
]);
