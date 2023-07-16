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
import AppHeader from "../../components/AppHeader/AppHeader";
import './SignUp.css'; // Import the CSS file

function SignUp({ hideAppHeader }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    document.body.style.backgroundImage = `url("https://i0.wp.com/www.minimalism.one/wp-content/uploads/2022/12/1642253642_14-adonius-club-p-fon-minimalizm-bezhevii-14-1.jpg?resize=1920%2C1080&ssl=1")`;
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
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        setToken(data.jwt);
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
      hideAppHeader(); // Hide the AppHeader component
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
        {hideAppHeader && <AppHeader />}
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
            Sign Up
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={form.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              Sign Up
              {isLoading && <CircularProgress size={24} />}
            </Button>
            <Link
              variant="body2"
              onClick={() => navigate("/signin")}
            >
              {"Already have an account? Sign In"}
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SignUp;