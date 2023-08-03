import React, { useContext } from "react";
import { Button, Box, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers";
import './AppHeader.css'; // Import the CSS file

// Import the logo image
import logoImage from "../../assets/logo.png";

const AppHeader = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Get the current location
  const location = useLocation();

  const handleLogout = () => {
    removeToken();
    setUser(null); // Set user to null to indicate user logout
    navigate("/signin", { replace: true });
  };

  // Check if the current location is signin or signup page
  const isSignInOrSignUpPage = location.pathname === '/signin' || location.pathname === '/signup';

  // If it's the signin or signup page, don't render the header
  if (isSignInOrSignUpPage) {
    return null;
  }

  return (
    <Toolbar className="header" style={{ height: '40px', backgroundColor: '#00b8d4' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Box display="flex" alignItems="center" className="left-buttons">
          <img src={logoImage} alt="Logo" className="logo-image" />
          <Button href="/home" variant="text" style={{ color: '#fff', fontSize: '14px', background: 'transparent', boxShadow: 'none', border: 'none', paddingBottom: '10px' }}>
            Home
          </Button>
        </Box>
        <Box display="flex" alignItems="center" className="right-buttons" >
          {user ? (
            <>
              <Button
                href="/profile"
                variant="outlined"
                color="inherit"
                style={{ color: '#fff', fontSize: '14px', background: 'transparent', boxShadow: 'none', border: 'none', padding: '0', marginRight: "10px" }}
              >
                {user.username}
              </Button>
              <Button
                variant="contained"
                onClick={handleLogout}
                style={{ color: '#fff', fontSize: '14px', background: 'transparent', boxShadow: 'none', border: 'none', padding: '0' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                href="/signin"
                variant="text"
                style={{ color: '#fff', fontSize: '14px', background: 'transparent', boxShadow: 'none', border: 'none', padding: '0' }}
              >
                Login
              </Button>
              <Button
                href="/signup"
                variant="contained"
                style={{ color: '#fff', fontSize: '14px', background: 'transparent', boxShadow: 'none', border: 'none', padding: '0' }}
              >
                SignUp
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Toolbar>
  );
};

export default AppHeader;
