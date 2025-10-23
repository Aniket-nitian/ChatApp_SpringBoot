import { Send, Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import { baseURL } from "../config/AxiosHelper";
import toast from "react-hot-toast";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const Chat = () => {
  const { roomId, currentUser, connected } = useChatContext();
  const [messages, setMessages] = useState([
    { sender: "Alice", content: "Hello everyone!" },
    { sender: "Bob", content: "Hi Alice!" },
  ]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);

  const nabvigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      nabvigate("/");
    }
  }, [connected, roomId, currentUser]);

  //page init

  //message loading
  //stompClient setup
  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(socket);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected to chat server");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      });
    };
    connectWebSocket();
  }, [roomId]);

  return (
    <div className="dark:bg-gray-900 h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex justify-around items-center dark:bg-gray-600 py-3 shadow fixed top-0 left-0 right-0 z-10">
        <h1 className="text-xl font-semibold">Room Id: ROOM_ID</h1>
        <h1 className="text-xl font-semibold">User: Aniket Chauhan</h1>
        <button className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded">
          Leave Room
        </button>
      </header>

      {/* Chat body */}
      <div className="flex flex-col flex-1 mt-16 mb-10 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "Alice" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-lg p-3 rounded-xl shadow-md ${
                msg.sender === "Alice"
                  ? "bg-blue-500 text-white ml-10 flex-row-reverse"
                  : "bg-gray-700 text-white mr-10"
              } items-start`}
            >
              <div
                className={`
          w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 
          ${
            msg.sender === "User"
              ? "bg-blue-200 text-blue-800 ml-3"
              : "bg-gray-500 text-white mr-3"
          }
        `}
              >
                {msg.sender.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                {/* Sender Name: Made smaller and clearer, with conditional rendering */}
                <strong
                  className={`
            text font-bold mb-1 block 
            ${msg.sender === "User" ? "text-blue-100 text-right" : "text-black"}
          `}
                >
                  {msg.sender}
                </strong>

                {/* Message Content */}
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer (chat input) */}
      <div className="fixed bottom-0 left-0 right-0 dark:bg-gray-900 p-3 flex items-center gap-2 shadow z-10">
        <input
          type="text"
          className="w-full p-2 rounded dark:bg-gray-800 focus:outline-none"
          placeholder="Type your message..."
        />

        {/* Attach File Button */}
        <button className="dark:bg-gray-700 dark:hover:bg-gray-600 p-3 rounded-full text-white">
          <Paperclip size={20} />
        </button>

        {/* Send Button */}
        <button className="flex items-center gap-2 dark:bg-blue-500 dark:hover:bg-blue-700 px-4 py-2 rounded text-white">
          <Send size={18} className="rotate-45" />
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
