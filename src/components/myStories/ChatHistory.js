import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import StoryCard from "./StoryCard";
import LoadingSkeleton from "../../utils/loadings/LoadingSkeleton";
import {
  fetch_total_story_by_using_session,
  sendMessage,
} from "../../utils/ApiCalls/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setNavBarIsOpen, setNoOfEpisodes } from "../../redux/MainReducer";
import StoryGeneratorForm from "./StoryGeneratorForm";

const ChatHistory = ({ selectedEpisode, isOpen }) => {
  const dispatch = useDispatch();

  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingCard, setShowLoadingCard] = useState(false);

  const { token, currentSessionId, myStoriesNavigation, navBarIsOpen } =
    useSelector((state) => state.mainReducer);

  const storyRefs = useRef([]);
  const loadingCardRef = useRef(null);

  const handleNewStoryGeneration = (story) => {
    setStories([story]);
  };

  const fetchDataFromBackend = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch_total_story_by_using_session(
        token,
        currentSessionId
      );
      setStories(response.data.stories);
      dispatch(setNoOfEpisodes({ noOfEpisodes: response.data.stories.length }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [currentSessionId, dispatch, token]);

  useEffect(() => {
    if (currentSessionId) {
      fetchDataFromBackend();
    }
    dispatch(setNavBarIsOpen({ navBarIsOpen: false }));
  }, [currentSessionId, token, navBarIsOpen, dispatch, fetchDataFromBackend]);

  useEffect(() => {
    if (selectedEpisode && storyRefs.current.length > 0) {
      const episodeIndex = parseInt(selectedEpisode.split("-")[1], 10) - 1;
      const targetStory = storyRefs.current[episodeIndex];

      if (targetStory) {
        targetStory.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        console.log("Target story not found:", episodeIndex);
      }
    }
  }, [selectedEpisode]);

  const handleContinueStory = async () => {
    setShowLoadingCard(true);
    setTimeout(() => {
      if (loadingCardRef.current) {
        loadingCardRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);

    let tags = [];
    let content = "";
    try {
      const response = await sendMessage(
        token,
        currentSessionId,
        tags,
        content
      );
      const newStory = response.data.generatedstory;

      setStories((prevStories) => {
        const updatedStories = [...prevStories, newStory];
        dispatch(setNoOfEpisodes({ noOfEpisodes: updatedStories.length }));
        return updatedStories;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          padding: "16px",
          height: "100%",
          width: "100%",
          overflowX: "auto",
          overflowY: "scroll",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "column",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#1d5c75",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        {myStoriesNavigation === 2 ? (
          <StoryGeneratorForm
            handleNewStoryGeneration={handleNewStoryGeneration}
            isOpen={isOpen}
          />
        ) : isLoading ? (
          <>
            <div style={{ width: "100%" }}>
              <LoadingSkeleton size={true} numberOfCards={4} />
            </div>
          </>
        ) : stories.length !== 0 ? (
          stories?.map((story, index) => (
            <div
              key={story._id}
              id={`Episode-${index + 1}`}
              ref={(el) => (storyRefs.current[index] = el)}
              style={{ width: "100%" }}
            >
              <Grid item xs={12}>
                <StoryCard story={story} />
              </Grid>
            </div>
          ))
        ) : (
          <>
            <p>No Stories</p>
          </>
        )}

        {showLoadingCard && (
          <div ref={loadingCardRef} style={{ width: "100%" }}>
            <LoadingSkeleton size={true} numberOfCards={1} />
          </div>
        )}
      </Box>

      {myStoriesNavigation !== 2 ? (
        <Box
          sx={{
            position: "absolute",
            bottom: "5px",
            right: "20px",
          }}
        >
          <Button
            sx={{
              border: "solid 1px #fff",
              background: "transparent",
              color: "#fff",
              padding: "8px 30px",
              fontSize: "0.8em",
              fontWeight: "500",
              letterSpacing: "2px",
              borderRadius: "40px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(3px)",
            }}
            onClick={handleContinueStory}
          >
            Continue Story
          </Button>
        </Box>
      ) : null}
    </Grid>
  );
};

export default ChatHistory;
