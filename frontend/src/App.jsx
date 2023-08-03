import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import BlogContent from "./components/BlogContent/BlogContent";
import Footer from "./components/AppFooter/AppFooter";
import AppHeader from "./components/AppHeader/AppHeader";
import About from "./pages/About/About";
import Profile from "./components/Profile/Profile";
import AuthProvider from "./components/AuthProvider/Authprovider";
import AccessDenied from "./pages/AccessDenied/AccessDenied";

const mainContentStyle = {
  paddingBottom: "170px",
  paddingTop: "50px", // Adjust this value as needed
};

const theme = createTheme({
  // Your theme configuration goes here
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

function AppRoutes() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/signup" && (
        <AppHeader />
      )}
      <div style={mainContentStyle}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/blog/:id"
            element={
              user && user.BlogsRead ? <BlogContent /> : <AccessDenied />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={user ? <Profile /> : <SignIn />}
          />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
