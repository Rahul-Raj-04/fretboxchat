import { useState } from "react";

import PersonalDetails from "./PersonalDetails";
import { useAuthStore } from "../../store/useAuthStore";

function EtitCurrentProfile() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview instantly before upload
    const objectUrl = URL.createObjectURL(file);
    setSelectedImg(objectUrl);

    // Send file to API
    await updateProfile({ profilePic: file });

    // Cleanup object URL after upload to avoid memory leaks
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <>
      <div className="tab-content active w-full md:w-[450px] lg:w-[380px] max-w-full shadow  h-screen overflow-y-hidden mb-[80px] lg:mb-0 bg-red-50 border-x-[1px] border-gray-200">
        <div>
          <div className="px-6 pt-6">
            <h4 className="mb-0 text-gray-700 ">Settings</h4>
          </div>
          <div className="p-6 text-center border-b border-gray-100 ">
            <div className="relative mb-4">
              <div className="relative w-24 h-24 mx-auto">
                <img
                  src={selectedImg || authUser?.profilePic}
                  className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full "
                  alt="Profile"
                />
                {/* Spinner Overlay (Only when Uploading) */}
                {isUpdatingProfile && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profilePicInput"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />

              <a
                href="#!"
                onClick={() =>
                  document.getElementById("profilePicInput").click()
                }
                className="absolute bottom-0 w-10 h-10 bg-gray-400 rounded-full  "
              >
                <i className="leading-10 ri-pencil-fill text-16"></i>
              </a>
            </div>

            <h5 className="mb-1 text-16 ">
              <span>{authUser?.fullName}</span>
            </h5>

            <div className="relative mb-1 dropdown">
              <a
                className="pb-1 text-gray-500 dropdown-toggle d-block "
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                id="dropdownMenuButtonX"
              >
                Available
              </a>
            </div>
          </div>
          <div className="p-6 h-[650px] overflow-y-auto custom-scrollbar">
            <PersonalDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default EtitCurrentProfile;
