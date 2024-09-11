import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TypingEffect from "./TypingEffect";
import {
  setCurrentSessionId,
  setMyStoriesNavigation,
  setNoOfEpisodes,
  setSelectedStoryTitle,
} from "../../redux/MainReducer";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ selectedStoryTitle }) => {
  const dispatch = useDispatch();
  const is768Screen = useMediaQuery("(max-width:768px)");
  const is430Screen = useMediaQuery("(max-width:430px)");
  const { myStoriesNavigation } = useSelector((state) => state.mainReducer);

  const HandleNavBar = () => {
    if (is430Screen) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
              marginTop: is768Screen || is430Screen ? "30px" : null,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: is768Screen ? "22px" : "26px",
                color: "#094b65",
                padding: "5px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                onClick={() => {
                  dispatch(setSelectedStoryTitle({ selectedStoryTitle: null }));
                  dispatch(setMyStoriesNavigation({ myStoriesNavigation: 0 }));
                }}
                style={{ cursor: "pointer" }}
              >
                My Stories
              </span>
            </Typography>

            {myStoriesNavigation !== 2 ? (
              <>
                <Button
                  sx={{
                    color: "white",
                    border: "none",
                    backgroundColor: "#094b65",
                    padding: is768Screen ? "6px 20px" : "8px 30px",
                    fontSize: is768Screen ? "0.8rem" : "1rem",
                    fontWeight: "500",
                    letterSpacing: "2px",
                    borderRadius: "40px",
                    height: "40x",
                  }}
                  onClick={() => {
                    dispatch(
                      setSelectedStoryTitle({ selectedStoryTitle: null })
                    );
                    dispatch(
                      setMyStoriesNavigation({ myStoriesNavigation: 2 })
                    );
                    dispatch(setCurrentSessionId({ currentSessionId: null }));
                    dispatch(setNoOfEpisodes({ noOfEpisodes: 0 }));
                  }}
                >
                  Start a New Story
                </Button>
              </>
            ) : null}
          </Box>
          <Typography>
            {selectedStoryTitle !== null ? (
              <>
                <span
                  style={{
                    fontSize: "22px",
                    color: "#094b65",
                    padding: "5px",
                    marginTop: "-30px",
                    position: "absolute",
                  }}
                >
                  <TypingEffect text={selectedStoryTitle} />
                </span>
              </>
            ) : (
              ""
            )}
          </Typography>
        </div>
      );
    } else {
      return (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",

              marginTop: is768Screen ? "30px" : null,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: is768Screen ? "22px" : "26px",
                color: "#094b65",
                padding: "5px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                onClick={() => {
                  dispatch(setSelectedStoryTitle({ selectedStoryTitle: null }));
                  dispatch(setMyStoriesNavigation({ myStoriesNavigation: 0 }));
                }}
                style={{ cursor: "pointer" }}
              >
                My Stories
              </span>

              {selectedStoryTitle !== null ? (
                <>
                  <ArrowForwardIcon />
                  <span style={{ fontSize: "22px" }}>
                    <TypingEffect text={selectedStoryTitle} />
                  </span>
                </>
              ) : (
                ""
              )}
            </Typography>

            {myStoriesNavigation !== 2 ? (
              <>
                <Button
                  sx={{
                    color: "white",
                    border: "none",
                    backgroundColor: "#094b65",
                    padding: is768Screen ? "6px 20px" : "8px 30px",
                    fontSize: is768Screen ? "0.8rem" : "1rem",
                    fontWeight: "500",
                    letterSpacing: "2px",
                    borderRadius: "40px",
                    height: "40x",
                  }}
                  onClick={() => {
                    dispatch(
                      setSelectedStoryTitle({ selectedStoryTitle: null })
                    );
                    dispatch(
                      setMyStoriesNavigation({ myStoriesNavigation: 2 })
                    );
                    dispatch(setCurrentSessionId({ currentSessionId: null }));
                    dispatch(setNoOfEpisodes({ noOfEpisodes: 0 }));
                  }}
                >
                  Start a New Story
                </Button>
              </>
            ) : null}
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <HandleNavBar />
    </>
  );
};

export default Header;
