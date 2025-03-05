import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore"; // Adjust path if needed

function Group() {
  const { groups, getGroups, setSelectedChat } = useChatStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getGroups(); // Fetch groups on component mount
  }, []);

  // Filter groups based on search input
  const filteredGroups = groups.filter((group) =>
    group.groupName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full md:w-[450px] lg:w-[380px] max-w-full shadow h-screen overflow-y-hidden mb-[80px] lg:mb-0 bg-white border-x-[1px] border-gray-200">
      <div className="h-screen lg:h-auto">
        <div className="px-6 pt-6 bg-white z-10">
          <div className="px-6 pt-6 bg-white z-10 flex items-center">
            <h4 className="mb-0 text-gray-700 mr-3">Group</h4>
          </div>

          {/* Search Bar */}
          <div className="py-1 mt-5 mb-5 bg-gray-100 flex items-center rounded-lg">
            <span className="bg-gray-100 pe-1 ps-3">
              <i className="text-lg text-gray-400 ri-search-line"></i>
            </span>
            <input
              type="text"
              className="border-0 bg-gray-100 placeholder:text-[14px] focus:ring-0 focus:outline-none placeholder:text-gray-400 flex-grow px-2"
              placeholder="Search groups"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Group List */}
        <div className="chat-message-list chat-group-list">
          <ul>
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => (
                <li
                  key={group._id}
                  className="px-5 py-[15px] hover:bg-gray-100 transition-all ease-in-out rounded cursor-pointer"
                  onClick={() => setSelectedChat(group)}
                >
                  <div className="flex items-center">
                    <div className="mr-5">
                      {group.groupImage ? (
                        <img
                          src={group.groupImage}
                          alt={group.groupName}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center rounded-full w-9 h-9 bg-red-500/20">
                          <span className="font-medium text-red-500">
                            {group.groupName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <h5 className="mb-0 text-gray-700 truncate text-14">
                        {group.groupName}
                      </h5>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-5 py-5 text-gray-500 text-center">
                No groups found
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Group;
