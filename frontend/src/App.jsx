import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home/Home';
import BlogContentPage from './pages/BlogContentPage/BlogContentPage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import useFetch from './hooks/useFetch'

const theme = createTheme({
  // Your theme configuration goes here
});

export default function App() {

  let{loading, data, error}= useFetch('http://localhost:1337/api/blogs?populate=*')
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error!!</p>

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home blogs={data?data:""} />} />
          <Route path="/post/:id" element={<BlogContentPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
