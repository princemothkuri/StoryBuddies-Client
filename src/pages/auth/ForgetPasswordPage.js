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
import { useNavigate } from "react-router-dom";
import { resetPassword, verifyEmail } from "../../utils/ApiCalls/ApiCalls";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Verify Email, Step 2: Reset Password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();

    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail) {
      setAlert({
        open: true,
        severity: "error",
        message: "Email is required.",
      });
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setAlert({
        open: true,
        severity: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await verifyEmail(formData.email);
      if (response.data.user) {
        setStep(2); // Move to step 2 if email is verified
      } else {
        setAlert({
          open: true,
          severity: "error",
          message: "Email not found. Please enter a valid email.",
        });
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setAlert({
        open: true,
        severity: "error",
        message: "Error verifying email",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setAlert({
        open: true,
        severity: "error",
        message: "Passwords do not match.",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword({
        email: formData.email,
        password: formData.password,
      });
      if (response.data.success) {
        setAlert({
          open: true,
          severity: "success",
          message: "Password updated successfully!",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setAlert({
        open: true,
        severity: "error",
        message: "Error updating password",
      });
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
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid white",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "white" }}
        >
          {step === 1 ? "Verify Email" : "Reset Password"}
        </Typography>

        {loading ? (
          <CircularProgress sx={{ color: "white" }} />
        ) : (
          <form
            noValidate
            autoComplete="off"
            onSubmit={
              step === 1 ? handleEmailVerification : handlePasswordReset
            }
          >
            {step === 1 ? (
              <TextField
                fullWidth
                label="Email"
                variant="standard"
                margin="normal"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{
                  input: { color: "white" },
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiInput-underline:before": {
                    borderBottom: "1px solid white",
                    color: "white",
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottom: "2px solid white",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "2px solid white",
                  },
                }}
              />
            ) : (
              <>
                <TextField
                  fullWidth
                  label="New Password"
                  variant="standard"
                  margin="normal"
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{
                    input: { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInput-underline:before": {
                      borderBottom: "1px solid white",
                      color: "white",
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
                  label="Confirm Password"
                  variant="standard"
                  margin="normal"
                  required
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={{
                    input: { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInput-underline:before": {
                      borderBottom: "1px solid white",
                      color: "white",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottom: "2px solid white",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottom: "2px solid white",
                    },
                  }}
                />
              </>
            )}

            <Box sx={{ mt: 2, display: "flex", gap: "20px" }}>
              {step === 1 ? (
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
                  onClick={() => navigate("/login")}
                >
                  Back To Login
                </Button>
              ) : null}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                {step === 1 ? "Verify Email" : "Reset Password"}
              </Button>
            </Box>
          </form>
        )}
      </Container>
    </Box>
  );
};

export default ForgetPasswordPage;
