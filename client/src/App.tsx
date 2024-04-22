import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./Styles/main.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
export default App;
