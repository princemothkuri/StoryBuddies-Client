import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, List, useMediaQuery, Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNavBarIsOpen } from "../../redux/MainReducer";
import LeaderBoardEpisodeList from "./LeaderBoardEpisodeList";
import LeaderBoardHeader from "./LeaderBoardHeader";
import { fetchCompleteStoryByUsingSessionId } from "../../utils/ApiCalls/ApiCalls";
import LeaderBoardLoading from "../../utils/loadings/LeaderBoardLoading";
import LeaderBoardCards from "./LeaderBoardCards";

const DisplayEntireStory = () => {
  const dispatch = useDispatch();

  const is430Screen = useMediaQuery("(max-width:430px)");
  const is393Screen = useMediaQuery("(max-width:393px)");

  const storyRefs = useRef([]);

  const { leaderBoardSessionId, token, navBarIsOpen } = useSelector(
    (state) => state.mainReducer
  );

  const [selectedEpisode, setSelectedEpisode] = useState("Episode-1");
  const [noOfEpisodes, setNoOfEpisodes] = useState(2);
  const [selectedStoryTitle, setSelectedStoryTitle] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectEpisode = (episode) => {
    setSelectedEpisode(episode);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const fetchStoryUsingSessionID = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchCompleteStoryByUsingSessionId(
        token,
        leaderBoardSessionId
      );
      setStories(response.data.stories);
      setNoOfEpisodes(response.data.stories.length);
      setSelectedStoryTitle(response.data.user_prompt);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [leaderBoardSessionId, token]);

  useEffect(() => {
    fetchStoryUsingSessionID();
    dispatch(setNavBarIsOpen({ navBarIsOpen: false }));
  }, [leaderBoardSessionId, dispatch, fetchStoryUsingSessionID]);

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

  if (loading) {
    return (
      <>
        <LeaderBoardLoading />
      </>
    );
  }

  const HandleEpisodeList = () => {
    if (is430Screen) {
      return (
        <>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{
              width: "200px",
              "& .MuiDrawer-paper": { width: "200px", padding: "0px 10px" },
            }}
          >
            <List>
              <LeaderBoardEpisodeList
                selectedEpisode={selectedEpisode}
                onSelectEpisode={onSelectEpisode}
                noOfEpisodes={noOfEpisodes}
                toggleDrawer={toggleDrawer}
              />
            </List>
          </Drawer>
        </>
      );
    } else {
      return (
        <>
          <Box
            sx={{
              width: "30%",
              borderRight: "1px solid #ccc",
              overflowY: "auto",
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
              padding: 2,
            }}
          >
            <List>
              <LeaderBoardEpisodeList
                selectedEpisode={selectedEpisode}
                onSelectEpisode={onSelectEpisode}
                noOfEpisodes={noOfEpisodes}
                toggleDrawer={toggleDrawer}
              />
            </List>
          </Box>
        </>
      );
    }
  };

  return (
    <>
      {!navBarIsOpen ? (
        <>
          <Box
            sx={{
              height: "90%",
              width: "100%",
            }}
          >
            <LeaderBoardHeader
              selectedStoryTitle={selectedStoryTitle}
              toggleDrawer={toggleDrawer}
            />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
              }}
            >
              {/* Left Side: Episode List */}
              <HandleEpisodeList />

              {/* Right Side: Story Display */}
              <Box
                sx={{
                  width: is430Screen ? "100%" : "70%",
                  padding: 3,
                  overflowY: "auto",
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
                {stories.map((episode, index) => (
                  <div
                    key={episode._id}
                    id={`Episode-${index + 1}`}
                    ref={(el) => (storyRefs.current[index] = el)}
                    style={{ width: "100%" }}
                  >
                    <LeaderBoardCards episode={episode} />
                  </div>
                ))}
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DisplayEntireStory;
