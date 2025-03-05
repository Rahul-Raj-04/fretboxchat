/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useProfile } from "../../Context/ViewProfileContext";
import Profileattachment from "./Profileattachment";
import { Baseurl } from "../../Config";

function ProfileSetting({ userId }) {
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  const { setIsProfileSettingOpen } = useProfile();
  const [user, setUser] = useState({});
  useEffect(() => {
    // Fetch the current user data (Replace with your actual API endpoint)
    fetch(`${Baseurl}/api/v1/user/currentuser?userId=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Ensure the token is stored securely
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [userId]);

  return (
    <>
      <div className="  h-[100vh] bg-white shadow overflow-y-hidden mb-[85px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-800 border-l-4 border-gray-50 dark:border-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700 absolute xl:relative top-0 bottom-0">
        <div className="px-6 pt-6">
          <div className="text-end">
            <button
              onClick={() => setIsProfileSettingOpen(false)}
              type="button"
              className="text-2xl text-gray-500 border-0 btn dark:text-gray-200"
              id="user-profile-hide"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>

        <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-600">
          <div className="mb-4">
            <img
              src="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
              className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
              alt=""
            />
          </div>

          <h5 className="mb-1 text-16 dark:text-gray-50">Doris Brown</h5>
          <h5 className="mb-0 truncate text-14 ltr:block rtl:hidden">
            <a href="#" className="text-gray-500 dark:text-gray-50">
              <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 "></i>{" "}
              Active
            </a>
          </h5>
        </div>

        <div className="p-6 h-[550px]" data-simplebar="">
          <div>
            <p className="mb-6 text-gray-500 dark:text-gray-300">
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
                  className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600"
                >
                  <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:block rtl:hidden">
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
                className={`overflow-hidden transition-all duration-300 ease-in-out  border border-t-0 border-gray-100 accordion-body ${
                  isPersonalOpen
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-white accordion-body">
                  <div className="p-5">
                    <div>
                      <p className="mb-1 text-gray-500">Name</p>
                      <h5 className="text-sm"> Rahul</h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500">Email</p>
                      <h5 className="text-sm">rahul@gmail.com</h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500">Time</p>
                      <h5 className="text-sm">
                        {new Date().toLocaleTimeString()}
                      </h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500">Location</p>
                      <h5 className="text-sm">NA</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Profileattachment />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSetting;
