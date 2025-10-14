import { Route, Routes } from "react-router";
import Chat from "../components/Chat";
import JoinCreateChat from "../components/JoinCreateChat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JoinCreateChat />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/*" element={<h1> 404 Not Find</h1>} />
    </Routes>
  );
};

export default AppRoutes;
