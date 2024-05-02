import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./Styles/main.css";
import "bootstrap/dist/css/bootstrap.css";
import ErrorBoundary from "../src/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router}></RouterProvider>
    </ErrorBoundary>
  );
}

export default App;
