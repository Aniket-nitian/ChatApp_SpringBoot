import { Send, Paperclip } from "lucide-react";
import { useRef, useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "Alice", content: "Hello everyone!" },
    { sender: "Bob", content: "Hi Alice!" },
    { sender: "Charlie", content: "Good to see you both." },
    { sender: "Alice", content: "How's everyone doing?" },
    { sender: "Bob", content: "Doing great, thanks!" },
    { sender: "Charlie", content: "Same here!" },
    { sender: "Alice", content: "What are you guys up to?" },
    { sender: "Bob", content: "Just working on a project." },
    { sender: "Charlie", content: "Thinking about going for a walk later." },
    { sender: "Alice", content: "Sounds fun!" },
    { sender: "Bob", content: "Maybe I'll join you." },
    { sender: "Charlie", content: "The more the merrier!" },
    { sender: "Alice", content: "Let's decide on a time." },
    { sender: "Bob", content: "How about 5 PM?" },
    { sender: "Charlie", content: "Works for me!" },
    { sender: "Alice", content: "Perfect, see you then!" },
  ]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);

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
