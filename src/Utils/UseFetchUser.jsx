/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { Baseurl } from "../Config";
import Cookies from "js-cookie";

// 1️⃣ Context Create Karein
const UserContext = createContext();

// 2️⃣ Provider Component Banayein
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get("userId");

  const fetchUser = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${Baseurl}/api/v1/user/currentuser?userId=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3️⃣ First time data load karein
  useEffect(() => {
    fetchUser();
  });

  return (
    <UserContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 4️⃣ Custom Hook to Use Context
export const useUser = () => useContext(UserContext);
