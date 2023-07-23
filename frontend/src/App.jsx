import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import BlogContent from './components/BlogContent/BlogContent';
import Footer from './components/AppFooter/AppFooter';
import AppHeader from './components/AppHeader/AppHeader';
import About from './pages/About/About';
import Profile from './components/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const mainContentStyle = {
  paddingBottom: '170px',
  paddingTop: '50px', // Adjust this value as needed
};
const theme = createTheme({
  // Your theme configuration goes here
});

export default function App() {
  // Get the current location
  const location = useLocation();

  // Check if the current location is signin or signup page
  const isSignInOrSignUpPage = location.pathname === '/signin' || location.pathname === '/signup';

  // If it's the signin or signup page, don't render the header and footer
  if (isSignInOrSignUpPage) {
    return (
      <ThemeProvider theme={theme}>
        <div style={mainContentStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogContent />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
    );
  }

  // If it's not the signin or signup page, render the header and footer
  return (
    <ThemeProvider theme={theme}>
      <AppHeader />
      <div style={mainContentStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}
