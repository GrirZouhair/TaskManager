import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import SignUp from "../pages/SignUp";
import LogInPage from "../pages/LogInPage";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
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