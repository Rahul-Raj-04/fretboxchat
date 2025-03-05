import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser, toggleProfile } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const handleProfileClick = async () => {
    await setSelectedUser(selectedUser); // ✅ User ka pura data fetch karega
    toggleProfile(true);
  };

  return (
    <>
      <header className="p-4 border-b border-gray-100 lg:p-6 flex items-center sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center w-full">
          <button
            className="block  lg:hidden p-2 text-gray-500 user-chat-remove text-16"
            onClick={() => setSelectedUser(null)}
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>

          <div className=" flex  cursor-pointer" onClick={handleProfileClick}>
            <img
              src={selectedUser.profilePic}
              className="rounded-full h-9 w-9 rtl:ml-3 ltr:mr-3"
              alt="name"
            />

            <div className="flex-grow overflow-hidden ml-4">
              {/* Show selected user name or default message */}
              <h5 className="mb-0 truncate text-16 text-gray-800">
                {selectedUser?.fullName || "Unknown User"}

                {onlineUsers.includes(selectedUser._id) ? (
                  <i
                    className={`ml-1 text-10  text-green-400 ri-record-circle-fill`}
                  ></i>
                ) : (
                  <i
                    className={`ml-1 text-10  text-red-400 ri-record-circle-fill`}
                  ></i>
                )}
              </h5>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default ChatHeader;
