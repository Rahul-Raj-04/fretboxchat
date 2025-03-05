import { useState, useEffect } from "react";

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setError("No access token found!");
      return;
    }

    fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => setError("Error fetching user data: " + err.message));
  }, []);

  return { user, error };
};

export default useFetchUser;
