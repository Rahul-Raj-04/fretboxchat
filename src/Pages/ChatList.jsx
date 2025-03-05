import { useEffect, useState } from "react";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ChatList() {
  const { getUsers, users, selectedUser, setSelectedUser } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const timeA = a.latestMessage?.createdAt
        ? new Date(a.latestMessage.createdAt).getTime()
        : 0;
      const timeB = b.latestMessage?.createdAt
        ? new Date(b.latestMessage.createdAt).getTime()
        : 0;
      return timeB - timeA; // Newest messages first
    });

  return (
    <div className="flex-grow">
      <div className="chat-leftsidebar w-full md:w-[450px] lg:w-[380px] max-w-full bg-white h-screen flex flex-col border-x-[1px] border-gray-200">
        {/* Header */}
        <div className="px-6 pt-6 bg-white z-10">
          <h4 className="mb-0 text-gray-700">Chats</h4>

          {/* Search Bar */}
          <div className="py-1 mt-5 mb-5 bg-gray-100 flex items-center rounded-lg">
            <span className="bg-gray-100 pe-1 ps-3">
              <i className="text-lg text-gray-400 ri-search-line"></i>
            </span>
            <input
              type="text"
              className="border-0 bg-gray-100 placeholder:text-[14px] focus:ring-0 focus:outline-none placeholder:text-gray-400 flex-grow px-2"
              placeholder="Search messages or users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Recent Chats Title */}
          <h5 className="mb-4 text-16">Recent</h5>
        </div>

        {/* User List */}
        <div className="h-[calc(100vh-160px)] px-2 overflow-y-auto custom-scrollbar">
          <ul className="chat-user-list">
            {filteredUsers.map((user) => (
              <li
                onClick={() => setSelectedUser(user)}
                key={user._id}
                className={`flex items-center justify-between hover:bg-gray-100 px-5 py-[15px] transition-all border-b border-gray-200 cursor-pointer ${
                  selectedUser?._id === user._id
                    ? "bg-gray-100 rounded-md"
                    : " rounded-md"
                }`}
              >
                <div className="flex items-center">
                  <div className="relative self-center mr-3">
                    <img
                      src={user.profilePic || "default-avatar.png"} // Fallback image
                      className="rounded-full w-9 h-9"
                      alt={user.fullName}
                    />
                    {onlineUsers.includes(user._id) && (
                      <span className="absolute w-2.5 h-2.5 border-2 border-white rounded-full top-7 right-1 bg-green-400"></span>
                    )}
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <h5 className="mb-1 text-base truncate">{user.fullName}</h5>
                    <p className="mb-0 text-gray-500 truncate text-14">
                      {user.latestMessage?.text || "No messages yet"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
