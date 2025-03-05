import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

function PersonalDetails() {
  const { authUser, updateUser } = useAuthStore();

  const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const updatedUser = await updateUser(formData);
    if (updatedUser) setIsEditing(false);
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
                    className="p-1.5 mb-1 bg-green-500 text-white rounded hover:bg-green-600 transition-all ease-in-out"
                    onClick={handleSubmit}
                  >
                    Save
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
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border rounded"
                />
              ) : (
                <h5 className="text-sm">{authUser?.fullName}</h5>
              )}

              <div className="mt-5">
                <p className="mb-1 text-gray-500">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  <h5 className="text-sm">{authUser?.email}</h5>
                )}
              </div>

              <div className="mt-5">
                <p className="mb-1 text-gray-500">Member Since</p>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
