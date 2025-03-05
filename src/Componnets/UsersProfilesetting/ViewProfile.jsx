import { useState } from "react";
import { useProfile } from "../../Context/ViewProfileContext";

function ViewProfile() {
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const toggleMenuDropdown = () => {
    setMenuDropdownOpen(!menuDropdownOpen);
  };

  const { isProfileSettingOpen, setIsProfileSettingOpen } = useProfile();
  return (
    <>
      <div className="col-span-4 sm:col-span-8">
        <ul className="flex items-center justify-end lg:gap-4">
          <li className="px-3">
            <div className="relative dropstart">
              <ul className="absolute z-50 hidden mt-2 text-left list-none bg-white border rounded-lg shadow-lg w-fit border-gray-50 dropdown-menu top-8">
                <li className="p-2">
                  <input
                    type="text"
                    className="text-gray-500 border-0 rounded bg-gray-50 placeholder:text-14 text-14 focus:ring-0"
                    placeholder="Search.."
                  />
                </li>
              </ul>
            </div>
          </li>

          <li className="px-3" onClick={() => setIsProfileSettingOpen(true)}>
            <a href="#" className="hidden text-gray-500 lg:block profileTab">
              <i className="text-xl ri-group-line"></i>
            </a>
          </li>

          <li className="px-3">
            <div className="relative dropdown">
              <button
                className="p-0 text-xl text-gray-500 border-0 btn dropdown-toggle"
                type="button"
                onClick={toggleMenuDropdown}
              >
                <i className="ri-more-fill"></i>
              </button>

              {menuDropdownOpen && (
                <ul className="absolute z-50 w-40  right-0 py-2 mt-2 bg-white border rounded shadow-lg border-gray-50 top-8">
                  <li>
                    <button
                      className="block w-full px-4 py-2 text-sm text-gray-700 bg-transparent hover:bg-gray-100/30"
                      onClick={() => setIsProfileSettingOpen((prev) => !prev)}
                    >
                      {isProfileSettingOpen ? "Close Profile" : "View Profile"}
                      <i className="text-gray-500 ml-2 ri-user-2-line text-16"></i>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ViewProfile;
