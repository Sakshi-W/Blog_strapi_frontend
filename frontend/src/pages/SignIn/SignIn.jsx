import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API } from "../../constant";
import { setToken } from "../../helpers";
import { getRandomImage } from "../../helpers";
import './SignIn.css'; // Import the CSS file

function SignIn({ hideAppHeader }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    document.body.style.backgroundImage = `url("https://marketplace.canva.com/EAEthkBVLfQ/1/0/1600w/canva-blush-wave-desktop-wallpaper-drvq3zaYl2E.jpg")`;
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  const handleInputChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        setToken(data.jwt);
        setUser(data.user);
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } 
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
       
        <CssBaseline />
        <Box
          component={Paper}
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: '400px',
            my: 'auto',
            mx: 3,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Typography color="error">{error}</Typography>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              onFinish(form);
            }}
            sx={{
              width: '100%',
              mt: 1,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={form.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
              {isLoading && <CircularProgress size={24} />}
            </Button>
            <Link
              variant="body2"
              onClick={() => navigate("/signup")}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SignIn;
