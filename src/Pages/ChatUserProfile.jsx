import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ChatUserProfile() {
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  const { selectedUser, toggleProfile } = useChatStore(); // ✅ Zustand ka use kiya
  const { getUserById, onlineUsers } = useAuthStore();
  const [userDetails, setUserDetails] = useState(null); // ✅ User details ke liye state

  useEffect(() => {
    if (selectedUser) {
      getUserById(selectedUser._id).then((data) => {
        if (data) setUserDetails(data);
      });
    }
  }, [selectedUser, getUserById]);

  if (!selectedUser || !userDetails) return null; // Agar user nahi mila to return null

  return (
    <>
      <div
        className={`${
          selectedUser ? "user-chat-show" : ""
        } h-[100vh] bg-white shadow overflow-y-hidden mb-[85px] lg:mb-0 border-l-4 border-gray-50 absolute xl:relative top-0 bottom-0  user-chat`}
      >
        <div className="px-6 pt-6">
          <div className="text-end">
            <button
              onClick={() => toggleProfile(false)}
              type="button"
              className="text-2xl text-gray-500 border-0 btn"
              id="user-profile-hide"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>

        <div className="px-6 text-center border-b border-gray-100">
          <div className="mb-4">
            <img
              src={userDetails.profilePic || "/default-avatar.png"} // ✅ API se image
              className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full"
              alt={userDetails.name}
            />
          </div>

          <h5 className="mb-1 text-16">{userDetails.fullName}</h5>
          <h5 className="mb-0 truncate text-14 ltr:block rtl:hidden">
            <a href="#" className="text-gray-500">
              {onlineUsers.includes(selectedUser._id) ? (
                <i
                  className={`ml-1 text-10  text-green-400 ri-record-circle-fill`}
                ></i>
              ) : (
                <i
                  className={`ml-1 text-10  text-red-400 ri-record-circle-fill`}
                ></i>
              )}
            </a>
          </h5>
        </div>

        <div className="p-6 h-[550px]" data-simplebar="">
          <div>
            <p className="mb-6 text-gray-500">
              If several languages coalesce, the grammar of the resulting
              language is more simple and regular than that of the individual.
            </p>
          </div>

          <div>
            <div className="text-gray-700 accordion-item">
              <h2>
                <button
                  onClick={() => setIsPersonalOpen(!isPersonalOpen)}
                  type="button"
                  className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active"
                >
                  <span className="m-0 text-[14px] font-semibold ltr:block rtl:hidden">
                    <i className="mr-2 align-middle ri-user-2-line d-inline-block"></i>{" "}
                    About
                  </span>

                  <i
                    className={`mdi mdi-chevron-down text-lg transition-transform duration-300 ease-in-out ${
                      isPersonalOpen ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>
              </h2>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out border border-t-0 border-gray-100 accordion-body ${
                  isPersonalOpen
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-white accordion-body">
                  <div className="p-5">
                    <div>
                      <p className="mb-1 text-gray-500">Name</p>
                      <h5 className="text-sm"> {userDetails.fullName}</h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500">Email</p>
                      <h5 className="text-sm">{userDetails.email}</h5>
                    </div>

                    <div className="mt-5">
                      <p className="mb-1 text-gray-500">Role</p>
                      <h5 className="text-sm">{userDetails.role}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatUserProfile;
