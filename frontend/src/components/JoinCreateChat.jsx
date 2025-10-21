import React, { useState } from "react";
import chatIcon from "../assets/chat (1).png";
import { toast } from "react-hot-toast";
import { createRoom, joinRoom } from "../services/RoomService.jsx";
import useChatContext from "../context/ChatContext.jsx";
import { useNavigate } from "react-router";

const JoinCreateChat = () => {
  const [details, setDetails] = useState({ roomId: "", userName: "" });
  const {
    roomId,
    currentUser,
    connected,
    setRoomId,
    setCurrentUser,
    setConnected,
  } = useChatContext();

  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (details.roomId.trim() === "" || details.userName.trim() === "") {
      toast.error("All fields are required");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      try {
        const room = await joinRoom(details.roomId);
        toast.success("Joined room successfully");
        setCurrentUser(details.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status == 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error joining room");
        }
        console.error("Error joining room:", error);
      }
    }
  }
  async function create() {
    if (validateForm()) {
      console.log(details);
      try {
        const response = await createRoom(details.roomId);
        console.log("Room created:", response);
        toast.success("Room created successfully");
        setCurrentUser(details.userName);
        setRoomId(response.roomId);
        setConnected(true);
        //forward to chat page
        navigate("/chat");
      } catch (error) {
        console.error("Error creating room:", error);
        toast.error("Error creating room");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 flex flex-col gap-6 w-full max-w-md border border-gray-300 rounded shadow-lg dark:bg-gray-600">
        <div>
          <img src={chatIcon} alt="chatIcon" className="w-24 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-center">Join/Create Room</h1>
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            YourName
          </label>
          <input
            onChange={handleFormInputChange}
            value={details.userName}
            type="text"
            id="name"
            name="userName"
            placeholder="Enter the Name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="roomId" className="block font-medium mb-2">
            Room Id
          </label>
          <input
            onChange={handleFormInputChange}
            value={details.roomId}
            name="roomId"
            type="text"
            id="roomId"
            placeholder="Enter the Room Id"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={joinChat}
            className="px-3 py-2 dark:bg-blue-500 hover:bg-blue-800 rounded"
          >
            Join Room
          </button>
          <button
            onClick={create}
            className="px-3 py-2 dark:bg-orange-500 hover:bg-orange-800 rounded"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
