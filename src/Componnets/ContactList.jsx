/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Baseurl } from "../Config";
import axios from "axios";
import Cookies from "js-cookie";
function ContactList({ setIsChatOpen, setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/user/alluser"); // <-- API URL yahan replace karein
        const result = await response.json();

        if (result.statusCode === 200) {
          setUsers(result.data);
        } else {
          setError("Failed to fetch users");
        }
      } catch (err) {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  if (loading) return <p className="text-center mt-4">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  // Users ko alphabetically sort karna
  const sortedUsers = [...users].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  // Unique initials nikalna
  const groupedUsers = sortedUsers.reduce((acc, user) => {
    const firstLetter = user.firstName[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});
  const handleUserClick = async (user) => {
    setSelectedUserId(user._id);
    setIsChatOpen(true);

    try {
      const response = await axios.post(
        Baseurl + "/api/v1/chat",
        { userId: user._id }, // API ke body me userId bhejna
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      const chatId = response.data._id;
      const selectedUserData = {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        avatar:
          user.avatar ||
          "https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-8.jpg",
        status: "online",
        chatId: chatId, // Store chatId
      };

      setSelectedUser(selectedUserData);
      setIsChatOpen(true);

      console.log("Chat API Response:", response.data);
      console.log("chatid", chatId);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };
  return (
    <>
      <div className="chat-leftsidebar w-full md:w-[450px] lg:w-[380px] max-w-full bg-white h-screen flex flex-col border-x-[1px] border-gray-200">
        {/* Header */}
        <div className="px-6 pt-6 bg-white z-10 flex items-center">
          {/* Back Arrow Button */}
          <button className="mr-3 text-gray-700 text-xl">←</button>
          <h4 className="mb-0 text-gray-700">New Chats</h4>
        </div>

        {/* Search Bar */}
        <div className="px-6">
          <div className="py-1 mt-5 mb-5  bg-gray-100 flex items-center rounded-lg">
            <span className="bg-gray-100 pe-1 ps-3">
              <i className="text-lg text-gray-400 ri-search-line"></i>
            </span>
            <input
              type="text"
              className="border-0 bg-gray-100 placeholder:text-[14px] focus:ring-0 focus:outline-none placeholder:text-gray-400 flex-grow px-2"
              placeholder="Search messages or users"
            />
          </div>
        </div>

        {/* User List */}
        <div className="h-[calc(100vh-160px)] px-2 overflow-y-auto custom-scrollbar">
          <div className="px-2">
            {Object.keys(groupedUsers).map((letter) => (
              <div key={letter}>
                {/* Alphabet Header */}
                <div className="p-3 font-bold text-gray-700">{letter}</div>

                <ul className="list-unstyled contact-list">
                  {groupedUsers[letter].map((user, index) => (
                    <li
                      onClick={() => handleUserClick(user)}
                      key={index}
                      className={`flex items-center justify-between px-5 py-[15px] hover:bg-gray-100 transition-all border-b border-gray-200 cursor-pointer ${
                        selectedUserId === user._id
                          ? "bg-gray-200" // <-- Active user background
                          : "hover:bg-gray-100 transition-all"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="relative self-center mr-3">
                          <img
                            src={
                              user.avatar ||
                              "https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-8.jpg"
                            }
                            className="rounded-full w-9 h-9"
                            alt={"avatar"}
                          />
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-1 text-base truncate">
                            {user.firstName} {user.lastName}
                          </h5>
                          <p className="mb-0 text-gray-500 truncate text-14">
                            Hey FretBox User
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactList;
