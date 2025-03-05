/* eslint-disable react/prop-types */
import { useState } from "react";

function PersonalDetails({ userdetails, loading, updateUser }) {
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: userdetails?._id || "",  // ✅ Ensure userId is always present
    firstName: userdetails?.firstName || "",
    lastName: userdetails?.lastName || "",
    emailAddress: userdetails?.emailAddress || "",
  });
  

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Save
  const handleSave = async () => {
    try {
      await updateUser(formData); // API call function
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="text-gray-700 accordion-item border border-gray-100 rounded">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full px-3 py-2 font-medium text-left accordion-header group"
          onClick={() => setIsPersonalOpen(!isPersonalOpen)}
        >
          <span className="m-0 text-[14px] font-medium">Personal Info</span>
          <i
            className={`mdi mdi-chevron-down text-lg transition-transform duration-300 ease-in-out ${
              isPersonalOpen ? "rotate-180" : ""
            }`}
          ></i>
        </button>
      </h2>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isPersonalOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white accordion-body">
          <div className="p-5">
            <div>
              <div className="float-right">
                {isEditing ? (
                  <button
                    type="button"
                    className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-all ease-in-out"
                    onClick={handleSave}
                  >
                    <i className="mr-1 align-middle ri-save-fill"></i> Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="p-1.5 bg-slate-100 border-transparent rounded hover:bg-gray-50 transition-all ease-in-out"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="mr-1 align-middle ri-edit-fill"></i> Edit
                  </button>
                )}
              </div>

              <p className="mb-1 text-gray-500">Name</p>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border p-1 w-full rounded mb-2 mt-2"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border p-1 w-full rounded"
                  />
                </>
              ) : (
                <h5 className="text-sm">
                  {loading
                    ? "Loading..."
                    : `${userdetails?.firstName} ${userdetails?.lastName}`}
                </h5>
              )}

              <div className="mt-5">
                <p className="mb-1 text-gray-500">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="border p-1 w-full rounded"
                  />
                ) : (
                  <h5 className="text-sm">
                    {loading ? "Loading..." : userdetails?.emailAddress}
                  </h5>
                )}
              </div>

              <div className="mt-5">
                <p className="mb-1 text-gray-500">Time</p>
                <h5 className="text-sm">{new Date().toLocaleTimeString()}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
