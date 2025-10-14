import React from "react";
import { Route, Routes } from "react-router";
import App from "../components/App";
import Chat from "../components/Chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/*" element={<h1> 404 Not Find</h1>} />
    </Routes>
  );
};

export default AppRoutes;
