import React from "react";
import { Button, Grid, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation hook
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers";
import './AppHeader.css'; // Import the CSS file

// Import the logo image
import logoImage from "../../assets/logo.png";

const AppHeader = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  
  // Get the current location
  const location = useLocation();

  const handleLogout = () => {
    removeToken();
    navigate("/signin", { replace: true });
  };

  // Check if the current location is signin or signup page
  const isSignInOrSignUpPage = location.pathname === '/signin' || location.pathname === '/signup';

  // If it's the signin or signup page, don't render the header
  if (isSignInOrSignUpPage) {
    return null;
  }

  return (
    <Toolbar className="header" style={{ height: '100px', borderBottom: '2px solid grey' }} >
      <Grid container alignItems="center" spacing={2}>
        <Grid item className="left-buttons">
          {/* Add the logo image */}
          <img src={logoImage} alt="Logo" className="logo-image" />
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
