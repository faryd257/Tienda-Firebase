// 📂 src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterApp } from "../src/router/RouterApp";

import { AuthProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterApp /> 
    </AuthProvider>
  </StrictMode>
);
