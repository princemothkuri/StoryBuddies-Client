import React from "react";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import LeaderBoardTypingEffect from "./LeaderBoardTypingEffect";
import {
  setLeaderBoardNavigation,
  setLeaderBoardSessionId,
} from "../../redux/MainReducer";
import { useDispatch } from "react-redux";

const LeaderBoardHeader = ({ selectedStoryTitle, toggleDrawer }) => {
  const dispatch = useDispatch();
  const is430Screen = useMediaQuery("(max-width:430px)");
  const is393Screen = useMediaQuery("(max-width:393px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "20px",
        height: "60px",
        padding: is430Screen ? "0px 5px" : "0px 20px",
      }}
    >
      <IconButton
        onClick={() => {
          dispatch(setLeaderBoardNavigation({ leaderBoardNavigation: 0 }));
          dispatch(setLeaderBoardSessionId({ leaderBoardSessionId: null }));
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 34, color: "#094b65" }} />
      </IconButton>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: "26px",
          color: "#094b65",
          padding: "5px",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "10px",
          marginLeft: is393Screen ? "-20px" : null,
        }}
      >
        {selectedStoryTitle !== null ? (
          <>
            <span style={{ fontSize: "22px" }}>
              <LeaderBoardTypingEffect
                selectedStoryTitle={selectedStoryTitle}
              />
            </span>
          </>
        ) : (
          ""
        )}
      </Typography>
      {is430Screen ? (
        <>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer()}
            sx={{ position: "absolute", right: "20px" }}
          >
            <MenuIcon style={{ color: "#094b65", fontSize: 40 }} />
          </IconButton>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default LeaderBoardHeader;
