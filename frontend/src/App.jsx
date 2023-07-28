import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import BlogContent from "./components/BlogContent/BlogContent";
import Footer from "./components/AppFooter/AppFooter";
import AppHeader from "./components/AppHeader/AppHeader";
import About from "./pages/About/About";
import Profile from "./components/Profile/Profile";
import AuthProvider, { useAuthContext } from "./components/AuthProvider/AuthProvider"; // Import useAuthContext here
import AccessDenied from "./pages/AccessDenied/AccessDenied";

const mainContentStyle = {
  paddingBottom: "170px",
  paddingTop: "50px", // Adjust this value as needed
};

const theme = createTheme({
  // Your theme configuration goes here
});

export default function App() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    // Show a loading indicator or splash screen while user data is loading
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
         <AppHeader /> {/* Show AppHeader only when the user is authenticated */}
          <div style={mainContentStyle}>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<BlogContent />} />
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </ThemeProvider>
  );
}