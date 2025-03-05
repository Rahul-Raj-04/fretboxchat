/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import avtar from "../assets/images/small/img-1.jpg";
import Cookies from "js-cookie";
import { Baseurl } from "../Config";
import moment from "moment";

function ChatList({ setIsChatOpen, setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const userId = Cookies.get("userId");

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await fetch(`${Baseurl}/api/v1/chat/getallchat`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        const formattedUsers = data.map((chat) => {
          const user = chat.users.find((u) => u._id !== userId);
          return {
            id: chat._id,
            otheruserId: chat.otherParticipants._id,
            name: chat.isGroupChat
              ? chat.chatName
              : `${user.firstName} ${user.lastName}`.trim() || "Unknown User",
            message: chat.latestMessage?.content || "No messages yet",
            time: chat.latestMessage?.sentOn
              ? moment(chat.latestMessage.sentOn).fromNow()
              : "No messages yet",
            avatar: chat.otherParticipants?.profilePhoto || avtar,
            status: user?.status || "online",
          };
        });

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userId]); // Depend on userId so it fetches fresh data if the user changes

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle user selection
  const handleUserClick = useCallback(
    (user) => {
      setIsChatOpen(true);
      setSelectedUser(user);
      setSelectedUserId(user.id);
    },
    [setIsChatOpen, setSelectedUser]
  );

  return (
    <div className="chat-leftsidebar w-full md:w-[450px] lg:w-[380px] max-w-full bg-white h-screen flex flex-col border-x-[1px] border-gray-200">
      {/* Header */}
      <div className="px-6 pt-6 bg-white z-10">
        <h4 className="mb-0 text-gray-700">Chats</h4>

        {/* Search Bar */}
        <div className="py-1 mt-5 mb-5  bg-gray-100 flex items-center rounded-lg">
          <span className="bg-gray-100 pe-1 ps-3">
            <i className="text-lg text-gray-400 ri-search-line"></i>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-gray-100 placeholder:text-[14px] focus:ring-0 focus:outline-none placeholder:text-gray-400 flex-grow px-2 "
            placeholder="Search messages or users"
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
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`${
                selectedUserId === user.id ? "bg-gray-200" : "hover:bg-gray-100"
              } flex items-center justify-between px-5 py-[15px]  transition-all border-b border-gray-200 cursor-pointer`}
            >
              <div className="flex items-center">
                <div className="relative self-center mr-3">
                  <img
                    src={user.avatar}
                    className="rounded-full w-9 h-9"
                    alt={user.name}
                  />
                  <span
                    className={`absolute w-2.5 h-2.5 border-2 border-white rounded-full top-7 right-1 ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "away"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                </div>
                <div className="flex-grow overflow-hidden">
                  <h5 className="mb-1 text-base truncate">{user.name}</h5>
                  <p className="mb-0 text-gray-500 truncate text-14">
                    {user.message}
                  </p>
                </div>
              </div>
              <div className=" relative">
                <div className="flex flex-col items-end">
                  <span className="text-gray-500 text-11">{user.time}</span>
                </div>
                {user.unreadCount > 0 && (
                  <div className="absolute top-5 right-0">
                    <span className="px-2 py-1 text-green-500 rounded-full bg-green-500/20 text-11">
                      02
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatList;
