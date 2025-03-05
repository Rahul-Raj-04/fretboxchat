import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    admin: "",
    superAdmin: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp, getAllUsers } = useAuthStore();
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState([]);
  const [superAdminList, setSuperAdminList] = useState([]);
  // Dummy data (Replace with API call or state data)
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();

      // Filter users by role
      const admins = users.filter((user) => user.role === "Admin");
      const superAdmins = users.filter((user) => user.role === "SuperAdmin");

      setAdminList(admins);
      setSuperAdminList(superAdmins);
    };

    fetchUsers();
  }, []);

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
      admin: "", // Reset selection
      superAdmin: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    navigate("/"); // Redirect after signup
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          FRETBOX
        </a>
        <div className="w-full bg-white rounded-lg shadow border sm:max-w-md">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold text-gray-900">
              Register a new account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2.5 border rounded-lg"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  className="w-full p-2.5 border rounded-lg"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className=" relative">
                <label className="block text-sm font-medium">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full p-2.5 border rounded-lg"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 top-6 flex items-center text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>

              {/* Role Selection (Radio Buttons) */}
              <div>
                <label className="block text-sm font-medium">Role</label>
                <div className="flex gap-4">
                  {["User", "Admin", "SuperAdmin"].map((role) => (
                    <label key={role} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={handleRoleChange}
                      />
                      <span>{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Admin Dropdown (Only for Users) */}
              {formData.role === "User" && (
                <div>
                  <label className="block text-sm font-medium">
                    Select Admin
                  </label>
                  <select
                    className="w-full p-2.5 border rounded-lg"
                    value={formData.admin}
                    onChange={(e) =>
                      setFormData({ ...formData, admin: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Admin</option>
                    {adminList.map((admin) => (
                      <option key={admin._id} value={admin._id}>
                        {admin.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Super Admin Dropdown (Only for Admins) */}
              {formData.role === "Admin" && (
                <div>
                  <label className="block text-sm font-medium">
                    Select Super Admin
                  </label>
                  <select
                    className="w-full p-2.5 border rounded-lg"
                    value={formData.superAdmin}
                    onChange={(e) =>
                      setFormData({ ...formData, superAdmin: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Super Admin</option>
                    {superAdminList.map((superAdmin) => (
                      <option key={superAdmin._id} value={superAdmin._id}>
                        {superAdmin.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gray-900 text-white p-2.5 rounded-lg"
              >
                {isSigningUp ? "Signing up..." : "Sign Up"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
