import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Profile from './components/Profile/Profile';
import BlogContentPage from './pages/BlogContentPage/BlogContentPage'; // Corrected import statement

const isAuthenticated = () => {
  // Implement your logic to check if the user is authenticated
  // For example, you can check if a token exists in localStorage or if the user is logged in
  // Return true if authenticated, otherwise return false
  const token = localStorage.getItem('token');
  return token !== null; // Return true if token exists, false otherwise
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/blogcontentpage" element={<BlogContentPage />} />
    </Routes>
  );
};

export default AppRoutes;
