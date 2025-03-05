import { useEffect } from "react";

import { useChatStore } from "../store/useChatStore";
import { useChat } from "../Context/ChatContext";

function ContactList() {
  const { getUsers, users, selectedUser, setSelectedUser } = useChatStore();
  const { setActiveTab } = useChat();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const groupedUsers = users.reduce((acc, user) => {
    const firstLetter = user.fullName.charAt(0).toUpperCase(); // Get first letter
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});
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
            {Object.keys(groupedUsers)
              .sort()
              .map((letter) => (
                <div key={letter}>
                  {/* Alphabet Header */}
                  <div className="p-3 font-bold text-gray-700">{letter}</div>

                  <ul className="list-unstyled contact-list">
                    {groupedUsers[letter].map((user) => (
                      <li
                        key={user._id}
                        onClick={() => {
                          setSelectedUser(user);
                          setActiveTab("Chats");
                        }}
                        className={`flex items-center justify-between px-5 py-[15px]  hover:bg-gray-100 transition-all border-b border-gray-200 cursor-pointer ${
                          selectedUser?._id === user._id ? "bg-gray-100 rounded-md" : " rounded-md"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="relative self-center mr-3">
                            <img
                              src={user.profilePic || "default-avatar.png"} // Fallback image
                              className="rounded-full w-9 h-9"
                              alt={"avatar"}
                            />
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <h5 className="mb-1 text-base truncate">
                              {user.fullName}
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
