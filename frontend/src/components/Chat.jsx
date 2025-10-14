const Chat = () => {
  return (
    <div>
      {/* header */}
      <header className="flex dark:border-gray-700  fixed w-full dark:bg-gray-900 py-3 shadow rounded justify-around items-center">
        <div>
          <h1 className="text-xl font-semibold">Room Id: ROOM_ID</h1>
        </div>
        <div>
          <h1 className="text-xl font-semibold">User: Aniket Chauhan</h1>
        </div>
        <div>
          <button className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded">
            Leave Room
          </button>
        </div>
      </header>
      {/* chat body */}
      <div></div>
      {/* chat texter */}
      <div className="border fixed bottom-0 w-full mx-auto dark:bg-gray-900 p-3 flex gap">
        <input type="text" className="w-full" />
        <button className="dark:bg-blue-500 dark:hover:bg-blue-700 px-3 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
