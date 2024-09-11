import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import Navbar from "../../components/Navbar";
import { fetchProfile } from "../../utils/ApiCalls/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setNavBarIsOpen } from "../../redux/MainReducer";

const ProfilePage = () => {
  const { token, navBarIsOpen } = useSelector((state) => state.mainReducer);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetchProfile(token);
        setProfile(response.data.profile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    dispatch(setNavBarIsOpen({ navBarIsOpen: false }));

    getProfile();
  }, [dispatch, token]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "black",
        padding: 2,
        background: "linear-gradient(to top, #1f80a7, transparent)",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <div
        style={{
          display: navBarIsOpen ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <>
            <Skeleton
              variant="rectangular"
              width={300}
              height={150}
              sx={{ marginBottom: 2 }}
            />
            <Skeleton
              variant="text"
              width={200}
              height={40}
              sx={{ marginBottom: 2 }}
            />
            <Skeleton variant="text" width={150} height={40} />
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Box
              sx={{
                width: "300px",
                padding: 2,
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: "transparent",
                textAlign: "center",
                border: "1px solid #094b65",
              }}
            >
              <Typography variant="h6">Username:</Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                {profile.username}
              </Typography>
              <Typography variant="h6">Email:</Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                {profile.email}
              </Typography>
              <Typography variant="h6">Gender:</Typography>
              <Typography variant="body1">{profile.gender}</Typography>
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};

export default ProfilePage;
