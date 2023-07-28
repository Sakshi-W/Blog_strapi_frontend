import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { setToken } from "../../helpers";
import "./SignUp.css"; // Import the CSS file

function SignUp({ hideAppHeader }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    document.body.style.backgroundImage = ``;
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const onFinish = async (values) => {
    const { username, email, password } = values;

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError(""); // Clear any previous errors

    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.jwt);
        setUser(data.user);
        navigate("/"); // Redirect to home page
      } else {
        setError(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false); // Make sure to stop loading in both success and error scenarios
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          component={Paper}
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: "400px",
            my: "auto",
            mx: 3,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box
            component="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              onFinish(form);
            }}
            sx={{
              width: "100%",
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
              sx={{ cursor: "pointer" }} // Add this line
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
