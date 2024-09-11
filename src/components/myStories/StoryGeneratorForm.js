import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Chip,
  InputLabel,
  FormControl,
  OutlinedInput,
  Typography,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { sendMessage } from "../../utils/ApiCalls/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppendNewStoryToAllStories,
  setCurrentSessionId,
  setMyStoriesNavigation,
  setNavBarIsOpen,
  setSelectedEpisode,
  setSelectedStoryTitle,
} from "../../redux/MainReducer";
import LoadingSkeleton from "../../utils/loadings/LoadingSkeleton";

const tagsOptions = ["adventure", "heroic", "fantasy", "mystery", "sci-fi"];

const StoryGeneratorForm = ({ handleNewStoryGeneration, isOpen }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.mainReducer);
  const [storyInput, setStoryInput] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [showLoadingCard, setShowLoadingCard] = useState(false);

  const is768Screen = useMediaQuery("(max-width:768px)");
  const is430Screen = useMediaQuery("(max-width:430px)");
  const is393Screen = useMediaQuery("(max-width:393px)");

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === "string" ? value.split(",") : value);
  };

  const handleGenerateClick = async () => {
    if (!storyInput.trim() || selectedTags.length === 0) {
      setSnackbarMessage(
        "Please enter a story prompt and select at least one tag."
      );
      setSnackbarOpen(true);
      return;
    }
    const session_id = "";
    const tags = selectedTags;
    const content = storyInput;
    setShowLoadingCard(true);
    try {
      const response = await sendMessage(token, session_id, tags, content);
      const newStory = response.data.generatedstory;
      const user_prompt = response.data.user_prompt;
      handleNewStoryGeneration(newStory);
      dispatch(
        setSelectedStoryTitle({
          selectedStoryTitle: user_prompt,
        })
      );
      dispatch(setSelectedEpisode({ selectedEpisode: "Episode-1" }));
      dispatch(
        setAppendNewStoryToAllStories({
          newStory: {
            _id: newStory._id,
            downvotes: newStory.downvotes,
            story: newStory.story,
            title: newStory.title,
            upvotes: newStory.upvotes,
            session_id: newStory.session_id,
            user_prompt: user_prompt,
            created_at: newStory.created_at,
          },
        })
      );
      dispatch(setCurrentSessionId({ currentSessionId: newStory.session_id }));
      setShowLoadingCard(false);
      dispatch(setMyStoriesNavigation({ myStoriesNavigation: 1 }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    dispatch(setNavBarIsOpen({ navBarIsOpen: false }));
  }, [dispatch]);

  if (showLoadingCard) {
    return (
      <>
        <div style={{ width: "100%" }}>
          <LoadingSkeleton size={true} numberOfCards={1} />
        </div>
      </>
    );
  }

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "transparent",
        overflow: "auto",
        display: isOpen ? "none" : "flex",
      }}
    >
      <Typography
        variant="h5"
        color="textPrimary"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#094b65",
          fontSize: is393Screen ? "20px" : "22px",
        }}
      >
        Unleash your imagination, every story is waiting to be told.
      </Typography>
      <Grid
        item
        xs={12}
        sx={{
          padding: "20px",
          backgroundColor: "transparent",
          borderRadius: "8px",
          marginTop: is393Screen
            ? "-150px"
            : is430Screen
            ? "-220px"
            : is768Screen
            ? "-350px"
            : "0px",
        }}
      >
        <Box sx={{ marginBottom: "16px" }}>
          <TextField
            label="Story Input"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            value={storyInput}
            onChange={(e) => setStoryInput(e.target.value)}
            placeholder="Enter your story prompt here..."
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "#094b65",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#094b65",
              },
            }}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "#094b65",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#094b65",
              },
            }}
          >
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={selectedTags}
              onChange={handleTagChange}
              input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {tagsOptions.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Button
            onClick={handleGenerateClick}
            sx={{
              color: "white",
              border: "none",
              backgroundColor: "#094b65",
              padding: "8px 30px",
              fontSize: "1rem",
              fontWeight: "500",
              letterSpacing: "2px",
              borderRadius: "40px",
              height: "40px",
            }}
          >
            Generate Story
          </Button>
        </Box>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default StoryGeneratorForm;
