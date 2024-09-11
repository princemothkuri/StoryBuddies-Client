import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  FormHelperText,
  CircularProgress,
  Alert,
  Snackbar,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { register } from "../../utils/ApiCalls/ApiCalls";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);

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

  const handleEmailBlur = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError("Entered email is invalid");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setAlert({
        open: true,
        severity: "error",
        message: "Passwords do not match",
      });
      return;
    }

    if (formData.gender === "") {
      setAlert({
        open: true,
        severity: "error",
        message: "Select your Gender!",
      });
      return;
    }

    setLoading(true);

    try {
      await register(formData);

      setAlert({
        open: true,
        severity: "success",
        message: "Sign up successful:",
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/login");
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message: "Sign up failed. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("./images/3.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
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
        maxWidth="sm"
        style={{
          textAlign: "center",
          padding: "20px 25px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
          border: "1px solid white",
          backdropFilter: "blur(10px)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Username"
              variant="standard"
              margin="normal"
              required
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
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
              label="Email"
              variant="standard"
              margin="normal"
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              disabled={loading}
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
            {emailError && <FormHelperText error>{emailError}</FormHelperText>}

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
              disabled={loading}
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
              label="Confirm Password"
              variant="standard"
              margin="normal"
              required
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
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
            <Grid
              sx={{
                display: "flex",
                alignItems: "self-start",
                justifyContent: "flex-start",
              }}
            >
              <FormControl
                component="fieldset"
                margin="normal"
                required
                sx={{ width: "100%", color: "white" }}
              >
                <FormLabel
                  component="legend"
                  sx={{
                    display: "flex",
                    alignItems: "self-start",
                    justifyContent: "flex-start",
                    width: "100%",
                    color: "white",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
                        disabled={loading}
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        disabled={loading}
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={
                      <Radio
                        disabled={loading}
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Box>

          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2, color: "white" }}
          >
            Already have an account?{" "}
            <Link href="/login" sx={{ fontWeight: "600" }}>
              Login
            </Link>
          </Typography>
        </form>
      </Container>
    </div>
  );
};

export default Register;
