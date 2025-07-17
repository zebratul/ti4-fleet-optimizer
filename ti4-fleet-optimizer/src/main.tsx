import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FleetProvider } from "./context/FleetContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FleetProvider>
        <App />
      </FleetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
