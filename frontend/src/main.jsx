import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import AppRoutes from "./config/AppRoutes.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster position="top-center" />
    <AppRoutes />
  </BrowserRouter>
);
