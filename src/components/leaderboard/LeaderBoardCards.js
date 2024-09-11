import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { downvoteApiCall, upvoteApiCall } from "../../utils/ApiCalls/ApiCalls";

const LeaderBoardCards = ({ episode }) => {
  const is430Screen = useMediaQuery("(max-width:430px)");
  const { user_id, leaderBoardSessionId, token } = useSelector(
    (state) => state.mainReducer
  );

  const [upvote, setUpvote] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(episode.upvotes.length);

  const [downvote, setDownvote] = useState(false);
  const [downvotesCount, setDownvotesCount] = useState(
    episode.downvotes.length
  );

  const handleUpvote = async (message_id) => {
    if (upvote) {
      setUpvote(false);
      setUpvotesCount(upvotesCount - 1);
    } else {
      setUpvote(true);
      setUpvotesCount(upvotesCount + 1);
      if (downvote) {
        setDownvote(false);
        setDownvotesCount(downvotesCount - 1);
      }
    }
    try {
      await upvoteApiCall(token, leaderBoardSessionId, message_id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownvote = async (message_id) => {
    if (downvote) {
      setDownvote(false);
      setDownvotesCount(downvotesCount - 1);
    } else {
      setDownvote(true);
      setDownvotesCount(downvotesCount + 1);
      if (upvote) {
        setUpvote(false);
        setUpvotesCount(upvotesCount - 1);
      }
    }
    try {
      await downvoteApiCall(token, leaderBoardSessionId, message_id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUpvotesCount(episode.upvotes.length);
    setDownvotesCount(episode.downvotes.length);
    if (episode.upvotes.includes(user_id)) {
      setUpvote(true);
    }
    if (episode.downvotes.includes(user_id)) {
      setDownvote(true);
    }
  }, [episode.downvotes, episode.upvotes, user_id]);

  return (
    <Box key={episode._id} mb={4}>
      <Typography
        variant="h4"
        sx={is430Screen ? { fontSize: "28px" } : {}}
        gutterBottom
      >
        {episode.title}
      </Typography>
      <Typography variant="body1" sx={is430Screen ? { fontSize: "20px" } : {}}>
        {episode.story}
      </Typography>
      <Box mt={2} display="flex" alignItems="center" sx={{ height: "40px" }}>
        {/* Upvote Button */}
        <IconButton
          color={upvote ? "primary" : "default"}
          onClick={() => {
            handleUpvote(episode._id);
          }}
        >
          <ThumbUpIcon
            sx={{
              fontSize: upvote ? "large" : "medium",
            }}
          />
        </IconButton>
        <Typography sx={{ marginRight: "10px" }}>{upvotesCount}</Typography>

        {/* Downvote Button */}
        <IconButton
          color={downvote ? "secondary" : "default"}
          onClick={() => {
            handleDownvote(episode._id);
          }}
        >
          <ThumbDownIcon
            sx={{
              fontSize: downvote ? "large" : "medium",
            }}
          />
        </IconButton>
        <Typography>{downvotesCount}</Typography>
      </Box>
    </Box>
  );
};

export default LeaderBoardCards;
