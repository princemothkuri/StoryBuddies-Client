import React from "react";
import {
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleGoBack = () => {
    // Implement navigation back to the homepage or previous page
    window.history.back();
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: isSmallScreen ? "20px" : "40px",
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: isSmallScreen ? 60 : 100,
          color: "#d32f2f",
          marginBottom: 2,
        }}
      />
      <Typography
        variant={isSmallScreen ? "h4" : "h3"}
        sx={{
          fontWeight: "bold",
          color: "#333",
          marginBottom: 2,
        }}
      >
        Oops! Something went wrong.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#666",
          marginBottom: 4,
          fontSize: isSmallScreen ? "1rem" : "1.25rem",
        }}
      >
        The page you are looking for doesn't exist or an error occurred.
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          padding: isSmallScreen ? "8px 16px" : "10px 20px",
          fontSize: isSmallScreen ? "0.9rem" : "1rem",
          borderRadius: "20px",
          textTransform: "none",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        onClick={handleGoBack}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default ErrorPage;
