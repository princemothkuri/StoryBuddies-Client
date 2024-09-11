import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { setNavBarNavigation } from "../../redux/MainReducer";
import { useDispatch, useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import PaginationLeaderBoardDisplayCards from "../../components/leaderboard/PaginationLeaderBoardDisplayCards";
import DisplayEntireStory from "../../components/leaderboard/DisplayEntireStory";
import { useNavigate } from "react-router-dom";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const is1024Screen = useMediaQuery("(max-width:1024px)");
  const is430Screen = useMediaQuery("(max-width:430px)");

  const { leaderBoardNavigation, token } = useSelector(
    (state) => state.mainReducer
  );

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    dispatch(setNavBarNavigation({ navBarNavigation: 1 }));
  }, [token, dispatch, navigate]);
  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #1f80a7, transparent)",
        backgroundAttachment: "fixed",
        height: "100vh",
        overflowY: "hidden",
        padding: "0px",
      }}
    >
      <div
        style={{
          position: "fixed",
          width: "100%",
        }}
      >
        <Navbar />
      </div>

      {leaderBoardNavigation === 0 ? (
        <>
          <Box
            sx={{
              padding: is430Screen
                ? "120px 30px 0px 30px"
                : is1024Screen
                ? "120px 20px 0px 40px"
                : "120px 100px 0px 100px",
              height: "100%",
              overflowY: "hidden",
            }}
          >
            <PaginationLeaderBoardDisplayCards />
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              padding: is430Screen
                ? "120px 0px 0px 0px"
                : is1024Screen
                ? "120px 20px 0px 40px"
                : "120px 100px 0px 100px",
              height: "100%",
              overflowY: "hidden",
            }}
          >
            <DisplayEntireStory />
          </Box>
        </>
      )}
    </Box>
  );
};

export default LeaderBoard;
