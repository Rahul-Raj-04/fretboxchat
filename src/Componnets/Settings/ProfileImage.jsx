/* eslint-disable react/prop-types */

function ProfileImage({ userdetails }) {
  return (
    <>
      <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-500">
        <div className="relative mb-4">
          <img
            src={
              userdetails.profilePhoto ||
              "https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-1.jpg"
            }
            className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
            alt=""
          />
          <a
            href="#!"
            className="absolute bottom-0 w-10 h-10 bg-gray-100 rounded-full ltr:right-28 rtl:left-28dark:bg-zinc-800 dark:text-gray-100"
          >
            <i className="leading-10 ri-pencil-fill text-16"></i>
          </a>
        </div>

        <h5 className="mb-1 text-16 dark:text-gray-50">
          <span>
            {userdetails.firstName} {userdetails.lastName}
          </span>
        </h5>

        <div className="relative mb-1 dropdown">
          <a
            className="pb-1 text-gray-500 dropdown-toggle d-block dark:text-gray-300"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            id="dropdownMenuButtonX"
          >
            Available
          </a>
        </div>
      </div>
    </>
  );
}

export default ProfileImage;
