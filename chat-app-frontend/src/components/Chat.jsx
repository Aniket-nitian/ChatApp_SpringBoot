import React from "react";
import toast from "react-hot-toast";

const Chat = () => {
  return (
    <div>
      <div>Chat</div>
      <button
        onClick={() => {
          toast.success("Happy");
        }}
      >
        Click me!!
      </button>
    </div>
  );
};

export default Chat;
