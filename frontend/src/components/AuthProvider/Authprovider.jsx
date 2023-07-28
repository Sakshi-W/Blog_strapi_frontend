import React, { useState, useEffect, useContext } from "react";
import { Snackbar } from "@mui/material";

import { AuthContext } from "../../context/AuthContext";
import { API, BEARER } from "../../constant";
import { getToken } from "../../helpers";

export default function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null); // Initialize userData as null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const authToken = getToken();

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user data.");
      }

      setUserData(data);
      setError(""); // Reset the error state if successful
    } catch (error) {
      console.error(error);
      setError(error.message || "Error while fetching user data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    setUserData(user);
  };

  const userHasReadPermission = () => {
    return (
      userData &&
      userData.roles &&
      userData.roles.some((role) => role.name === "blogsread")
    );
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        setUser: handleUser,
        isLoading,
        userHasReadPermission,
      }}
    >
      {children}
      <Snackbar
        open={Boolean(error)}
        onClose={() => setError("")}
        message={error}
        autoHideDuration={5000}
      />
    </AuthContext.Provider>
  );
}

// Export the useAuthContext function separately
export function useAuthContext() {
  return useContext(AuthContext);
}
