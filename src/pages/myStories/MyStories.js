import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllStoriesOfCurrentUser,
  setNavBarIsOpen,
  setNavBarNavigation,
} from "../../redux/MainReducer";
import { fetchCurrentUserStories } from "../../utils/ApiCalls/ApiCalls";
import { Box, Grid, useMediaQuery } from "@mui/material";
import LoadingSkeleton from "../../utils/loadings/LoadingSkeleton";
import Header from "../../components/myStories/Header";
import StoryItems from "../../components/myStories/StoryItems";
import ChatLayout from "../../components/myStories/ChatLayout";
import { useNavigate } from "react-router-dom";

const MyStories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const is1024Screen = useMediaQuery("(max-width:1024px)");
  const is768Screen = useMediaQuery("(max-width:768px)");
  const is430Screen = useMediaQuery("(max-width:430px)");

  const {
    token,
    myStoriesNavigation,
    allStoriesOfCurrentUser,
    selectedStoryTitle,
    navBarIsOpen,
  } = useSelector((state) => state.mainReducer);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    dispatch(setNavBarNavigation({ navBarNavigation: 2 }));
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await fetchCurrentUserStories(token);

        dispatch(
          setAllStoriesOfCurrentUser({
            allStoriesOfCurrentUser: response?.data?.stories,
          })
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    dispatch(setNavBarIsOpen({ navBarIsOpen: false }));
    fetchStories();
  }, [token, dispatch, navigate]);

  const ComponentRender = () => {
    if (myStoriesNavigation === 0) {
      return (
        <>
          <Grid
            container
            spacing={2}
            sx={{
              height: is768Screen ? "85vh" : "450px",
              paddingBottom: "50px",
              position: "relative",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
              display: "flex",
              flexDirection: "row",
              justifyContent: "self-start",
              flexWrap: "wrap",
              alignItems: "self-start",
            }}
          >
            {loading ? (
              <LoadingSkeleton size={false} numberOfCards={6} />
            ) : allStoriesOfCurrentUser?.length === 0 ? (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    fontSize: "20px",
                    color: "#1d5c75",
                    fontWeight: "600",
                  }}
                >
                  No Stories Generated...
                </p>
              </Grid>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingLeft: is430Screen ? "20px" : "",
                }}
              >
                {allStoriesOfCurrentUser?.map((story) => (
                  <Grid
                    item
                    xs={12}
                    sm={is430Screen ? 12 : is768Screen ? 6 : 4}
                    key={story._id}
                    sx={{
                      marginBottom: "10px", // Reduce the bottom margin to decrease space between cards
                      padding: 0, // Remove padding if any
                      overflowY: "scroll",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                      "-ms-overflow-style": "none",
                      "scrollbar-width": "none",
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "start",
                    }}
                  >
                    <StoryItems story={story} />
                  </Grid>
                ))}
              </div>
            )}
          </Grid>
        </>
      );
    } else if (myStoriesNavigation === 1 || 2) {
      return (
        <>
          <ChatLayout />
        </>
      );
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #1f80a7, transparent)",
        backgroundAttachment: "fixed",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Box
        sx={
          is430Screen
            ? { padding: "20% 20px 10px 20px" }
            : is1024Screen
            ? { padding: "10% 40px 10px 40px" }
            : { padding: "10% 100px 10px 100px" }
        }
        style={{ display: navBarIsOpen ? "none" : "block" }}
      >
        <Header selectedStoryTitle={selectedStoryTitle} />
        <div style={{ width: "100%", height: "100%", marginTop: "-20px" }}>
          <ComponentRender />
        </div>
      </Box>
    </Box>
  );
};

export default MyStories;
