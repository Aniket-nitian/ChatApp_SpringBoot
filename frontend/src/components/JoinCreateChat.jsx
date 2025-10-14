import React from "react";
import chatIcon from "../assets/chat (1).png";

const JoinCreateChat = () => {
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
            type="text"
            id="name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="roomId" className="block font-medium mb-2">
            Room Id
          </label>
          <input
            type="text"
            id="roomId"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center gap-2 mt-3">
          <button className="px-3 py-2 dark:bg-blue-500 hover:bg-blue-800 rounded">
            Join Room
          </button>
          <button className="px-3 py-2 dark:bg-orange-500 hover:bg-orange-800 rounded">
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
