import { create } from "zustand";

import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { axiosInstance } from "../Lib/axios";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/user/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/api/v1/user/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/v1/user/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async (resetChatTab) => {
    try {
      await axiosInstance.post("/api/v1/user/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
      if (resetChatTab) resetChatTab();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateUser: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.patch("/api/v1/user/update_user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (get().authUser?._id === res.data.user._id) {
        set((state) => ({
          authUser: { ...state.authUser, ...res.data.user }, // Merge instead of replacing
        }));
      }

      toast.success("User updated successfully");
      return res.data.user;
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update user");
      return null;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },


  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const formData = new FormData();
      formData.append("profilePic", data.profilePic); // Assuming `profilePic` is a File object

      Object.keys(data).forEach((key) => {
        if (key !== "profilePic") {
          formData.append(key, data[key]);
        }
      });

      const res = await axiosInstance.patch(
        "api/v1/user/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      set((state) => ({
        authUser: { ...state.authUser, ...res.data }, // Merge instead of replacing
      }));

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  getUserById: async (userId) => {
    try {
      const res = await axiosInstance.get(`/api/v1/user/singleuser/${userId}`);
      return res.data; // Returns user details
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error(error.response?.data?.message || "User not found");
      return null;
    }
  },
  getAllUsers: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/user/alluser");
      return res.data; // Returns the list of users
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to fetch users");
      return [];
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
