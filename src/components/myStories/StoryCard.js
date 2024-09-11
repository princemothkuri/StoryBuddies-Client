import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useSelector } from "react-redux";
import { downvoteApiCall, upvoteApiCall } from "../../utils/ApiCalls/ApiCalls";

const StoryCard = ({ story }) => {
  const { user_id, token, currentSessionId } = useSelector(
    (state) => state.mainReducer
  );

  const [upvote, setUpvote] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(story.upvotes.length);

  const [downvote, setDownvote] = useState(false);
  const [downvotesCount, setDownvotesCount] = useState(story.downvotes.length);

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
      await upvoteApiCall(token, currentSessionId, message_id);
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
      await downvoteApiCall(token, currentSessionId, message_id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUpvotesCount(story.upvotes.length);
    setDownvotesCount(story.downvotes.length);
    if (story.upvotes.includes(user_id)) {
      setUpvote(true);
    }
    if (story.downvotes.includes(user_id)) {
      setDownvote(true);
    }
  }, [story.downvotes, story.upvotes, user_id]);
  return (
    <Card
      sx={{
        marginBottom: "20px",
        padding: "4px 20px",
        border: "1px solid #094b65",
        width: "100%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
        background: "transparent",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {story.title}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: "8px" }}>
          {story.story}
        </Typography>
        <Typography
          variant="caption"
          sx={{ marginTop: "8px", display: "block" }}
        >
          Upvotes: {upvotesCount} | Downvotes: {downvotesCount}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Tooltip title={"Upvote"} arrow>
            <IconButton
              // color="primary"
              size="small"
              color={upvote ? "primary" : "default"}
              onClick={() => {
                handleUpvote(story._id);
              }}
              sx={{
                transition: "box-shadow 0.3s ease-in-out",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ThumbUpIcon
                sx={{
                  fontSize: upvote ? "large" : "medium",
                  // fontSize: "22px",
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Downvote"} arrow>
            <IconButton
              // color="secondary"
              size="small"
              color={downvote ? "secondary" : "default"}
              onClick={() => {
                handleDownvote(story._id);
              }}
              sx={{
                transition: "box-shadow 0.3s ease-in-out",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ThumbDownIcon
                sx={{
                  fontSize: downvote ? "large" : "medium",
                  // fontSize: "22px",
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
