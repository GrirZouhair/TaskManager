import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import LogedInUser from "./provider/logedInUser.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LogedInUser>
      <App />
    </LogedInUser>
  </React.StrictMode>
);
