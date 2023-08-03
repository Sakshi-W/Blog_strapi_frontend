import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";

import { AuthContext } from "../../context/AuthContext";
import { API, BEARER } from "../../constant";
import { getToken } from "../../helpers";

export default function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const authToken = getToken();
  const localUser = localStorage.getItem('user');

  useEffect(() => {
    if (localUser) {
      setUserData(JSON.parse(localUser));
    } else if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

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

      localStorage.setItem('user', JSON.stringify(data));
      setUserData(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError(error.message || "Error while fetching user data.");
      localStorage.removeItem('user'); // Clear local storage
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUserData(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        setUser: handleUser,
        isLoading,
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
