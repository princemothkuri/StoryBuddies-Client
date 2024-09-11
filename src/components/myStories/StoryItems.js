import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentSessionId,
  setMyStoriesNavigation,
  setSelectedEpisode,
  setSelectedStoryTitle,
} from "../../redux/MainReducer";

const StoryItems = ({ story }) => {
  const is1024Screen = useMediaQuery("(max-width:1024px)");
  const is768Screen = useMediaQuery("(max-width:768px)");
  const is430Screen = useMediaQuery("(max-width:430px)");
  const dispatch = useDispatch();
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          height: "200px",
          width: is430Screen
            ? "100%"
            : is768Screen
            ? "330px"
            : is1024Screen
            ? "300px"
            : "370px",
          background: "transparent",
          cursor: "pointer",
          border: "1px solid rgba(255, 255, 255, 0.3)",

          transition: "transform 0.5s ease-in-out",
          "&:hover": {
            border: "none",
            boxShadow: "inset 0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
        onClick={() => {
          dispatch(setCurrentSessionId({ currentSessionId: story.session_id }));
          dispatch(setMyStoriesNavigation({ myStoriesNavigation: 1 }));
          dispatch(setSelectedEpisode({ selectedEpisode: "Episode-1" }));
          dispatch(
            setSelectedStoryTitle({
              selectedStoryTitle: story.user_prompt,
            })
          );
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {story.user_prompt.substring(0, is1024Screen ? 45 : 55) + "..."}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "500",
              fontSize: "16px",
              marginTop: "5px",
            }}
          >
            {is430Screen ? story.title.substring(0, 40) + "..." : story.title}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            {story.story.length > 100
              ? story.story.substring(0, 100) + "..."
              : story.story}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StoryItems;
