import React, { useState } from "react";
import chatIcon from "../assets/chat (1).png";
import { toast } from "react-hot-toast";
import { createRoom } from "../services/RoomService.jsx";

const JoinCreateChat = () => {
  const [details, setDetails] = useState({ roomId: "", userName: "" });

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

  function joinChat() {
    if (validateForm()) {
      // Proceed to join the chat room
    }
  }
  async function create() {
    if (validateForm()) {
      console.log(details);
      try {
        const response = await createRoom(details.roomId);
        console.log("Room created:", response);
        toast.success("Room created successfully");
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
        <h1 className="text-2xl font-bold font-semibold text-center">
          Join/Create Room
        </h1>
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
