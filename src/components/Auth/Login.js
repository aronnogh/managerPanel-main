// LoginForm.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, InputAdornment, Card, CardContent } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      Cookies.set("username", username, { expires: 1 });
      Cookies.set("role", "admin", { expires: 1 });
      login();
      navigate("/dashboards/dashboard1");
    } else {
      setError("Invalid username or password. Please try again.");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
