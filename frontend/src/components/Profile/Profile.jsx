import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Grid, TextField, Snackbar } from "@mui/material";

import { AuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { getToken } from "../../helpers";

import "../../styles/fonts/fonts.css";

const Profile = () => {
  const { user, setUser, isLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  useEffect(() => {
    if (user) {
      setUpdatedUser({ ...user });
    }
  }, [user]);

  // Handle changes to the user data
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include the Authorization header with the token
          Authorization: `Bearer ${getToken()}`, // Replace `getToken()` with your actual function to get the auth token
        },
        body: JSON.stringify(updatedUser),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong!");
      }

      setUser(responseData);
      alert("Data saved successfully!");
    } catch (error) {
      console.error(error);
      setError("Error while updating the profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "10px", marginTop: "2px" }}>
      <Card className="profile_page_card">
        <form onSubmit={handleProfileUpdate}>
          <Grid paddingTop={1} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ fontFamily: "Gentinum_Plus" }}
                label="Username"
                name="username"
                variant="outlined"
                required
                fullWidth
                value={updatedUser?.username || ""}
                onChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ fontFamily: "Gentinum_Plus" }}
                label="Email"
                name="email"
                variant="outlined"
                required
                fullWidth
                value={updatedUser?.email || ""}
                onChange={handleUserChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ paddingTop: "9px", textAlign:'center' }}>
            <TextField
              style={{ fontFamily: "Gentinum_Plus" }}
              label="About"
              name="about"
              variant="outlined"
              required
              fullWidth
              multiline
              minRows={6}
              maxRows={6}
              value={updatedUser?.about || ""}
              onChange={handleUserChange}
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            style={{ marginTop: "25px" }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
        <Snackbar
          open={Boolean(error)}
          onClose={() => setError("")}
          message={error}
          autoHideDuration={5000}
        />
      </Card>
    </div>
  );
};

export default Profile;
