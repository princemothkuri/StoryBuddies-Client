import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../utils/ApiCalls/ApiCalls";
import { addUserDetails } from "../../redux/MainReducer";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({
        username: formData.usernameOrEmail,
        password: formData.password,
      });

      setAlert({
        open: true,
        severity: "success",
        message: "Login Successful!",
      });

      dispatch(
        addUserDetails({
          token: response.data.token,
          username: response.data.username,
          user_id: response.data.user_id,
        })
      );
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        setAlert({
          open: true,
          severity: "error",
          message: "Invalid email or password",
        });
      } else {
        setAlert({
          open: true,
          severity: "error",
          message: "Login failed!",
        });
        console.error(
          "Login failed:",
          error.response?.data?.error || error.message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: "url(./images/4.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: "50px" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Container
        maxWidth="xs"
        sx={{
          textAlign: "center",
          padding: "40px 20px",
          backdropFilter: "blur(10px)",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
          border: "1px solid white",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "white" }}
        >
          Login
        </Typography>

        {loading ? (
          <CircularProgress sx={{ color: "white" }} />
        ) : (
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Username or Email"
                variant="standard"
                margin="normal"
                required
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                sx={{
                  input: { color: "white" },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "1px solid white",
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottom: "2px solid white",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "2px solid white",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="standard"
                margin="normal"
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={{
                  input: { color: "white" },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "1px solid white",
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottom: "2px solid white",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "2px solid white",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                component={Link}
                to="/forgot-password"
                variant="body2"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Login
              </Button>
            </Box>

            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ color: "white", mt: 2 }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#1976d2" }}
                sx={{ fontWeight: "600" }}
              >
                Sign Up
              </Link>
            </Typography>
          </form>
        )}
      </Container>
    </Box>
  );
};

export default LoginPage;
