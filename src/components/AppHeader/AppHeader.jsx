import React from "react";
import { Button, Grid, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers";
import './AppHeader.css'; // Import the CSS file


const AppHeader = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/signin", { replace: true });
  };

  return (
    <Toolbar className="header" style={{ height: "100px" }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item className="left-buttons">
          <Button href="/" variant="text" className="Homebutton">
            Home
          </Button>
        </Grid>
        <Grid item flexGrow={1}></Grid>
        <Grid item className="right-buttons">
          {user ? (
            <>
              <Button
                href="/profile"
                variant="outlined"
                color="inherit"
                className="profile_save_btn"
              >
                {user.username}
              </Button>
              <Button
                variant="contained"
                onClick={handleLogout}
                className="logoutButton" // Updated class name
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                href="/signin"
                variant="text"
                className="Loginbutton"
              >
                Login
              </Button>
              <Button
                href="/signup"
                variant="contained"
                className="SignUpbutton"
              >
                SignUp
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default AppHeader;
