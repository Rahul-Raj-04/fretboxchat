import ViewProfile from "../Componnets/UsersProfilesetting/ViewProfile";

/* eslint-disable react/prop-types */

function ChatHeader({ setIsChatOpen, selectedUser }) {
  const userId = selectedUser?.otheruserId || selectedUser?.id;
  return (
    <>
      <header className="p-4 border-b border-gray-100 lg:p-6 flex items-center sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center w-full">
          <button
            onClick={() => setIsChatOpen(false)}
            className="block  lg:hidden p-2 text-gray-500 user-chat-remove text-16"
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>

          <img
            src={
              selectedUser
                ? selectedUser.avatar
                : "https://via.placeholder.com/40"
            }
            className="rounded-full h-9 w-9 rtl:ml-3 ltr:mr-3"
            alt={selectedUser ? selectedUser.name : "User Avatar"}
          />

          <div className="flex-grow overflow-hidden ml-4">
            {/* Show selected user name or default message */}
            <h5 className="mb-0 truncate text-16 text-gray-800">
              {selectedUser ? selectedUser.name : "Select a user"}

              {selectedUser && (
                <i
                  className={`ml-1 text-10 ${
                    selectedUser.status === "online"
                      ? "text-green-500"
                      : selectedUser.status === "away"
                      ? "text-yellow-500"
                      : "text-gray-400"
                  } ri-record-circle-fill`}
                ></i>
              )}
            </h5>
          </div>

          <ViewProfile userId={userId} />
        </div>
      </header>
    </>
  );
}

export default ChatHeader;
