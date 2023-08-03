import React, { useState, useEffect, useContext } from "react";
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

import { AuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { setToken } from "../../helpers";
import "./SignIn.css"; // Import the CSS file

function SignIn({ hideAppHeader }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    document.body.style.backgroundImage = ``;
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  const handleInputChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    setError(""); // Clear any previous errors

    try {
      if (!values.email || !values.password) {
        setError("Please enter both email and password.");
        setIsLoading(false);
        return;
      }

      if (!isEmailValid(values.email)) {
        setError("Please enter a valid email address.");
        setIsLoading(false);
        return;
      }
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
      if (response.ok) {
        setToken(data.jwt);
        setUser(data.user);
        navigate("/home"); // Redirect to the home page
      } else {
        setError(data?.message || "Invalid email or password.");
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
           <img
            src="https://static.wixstatic.com/media/ca5e11_bf2d01eac4b64762b0621d98d60f793c~mv2.png"
            alt="Logo"
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />
          <Typography component="h1" variant="h5">
            Sign in
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
              sx={{ cursor: "pointer" }} // Add this line
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
