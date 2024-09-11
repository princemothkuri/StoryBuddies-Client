import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSessionId,
  setMyStoriesNavigation,
  setSelectedStoryTitle,
} from "../../redux/MainReducer";
import { ListItem, Tooltip, useMediaQuery } from "@mui/material";

const SideBarDisplayAllStories = ({ onSelectEpisode }) => {
  const dispatch = useDispatch();
  const { allStoriesOfCurrentUser, currentSessionId } = useSelector(
    (state) => state.mainReducer
  );
  const is393Screen = useMediaQuery("(max-width:393px)");
  return (
    <>
      {allStoriesOfCurrentUser ===
      null ? null : allStoriesOfCurrentUser?.length === 0 ? (
        <>
          <p
            style={{
              width: "100%",
              height: "60%",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "16px",
              color: "#1d5c75",
              fontWeight: "600",
              padding: "6px",
            }}
          >
            No Stories...
          </p>
        </>
      ) : (
        allStoriesOfCurrentUser?.map((item) => {
          const isActive = item.session_id === currentSessionId;

          return (
            <Tooltip title={item.user_prompt} arrow placement="right">
              <ListItem
                button
                sx={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  backgroundColor: isActive ? "#094b65" : "transparent",
                  color: isActive ? "white" : "black",
                  border: "1px solid transparent",
                  "&:hover": {
                    backgroundColor: isActive ? "#094b65" : "transparent",
                    border: isActive
                      ? "1px solid transparent"
                      : "1px solid #094b65",
                  },
                  borderRadius: "10px",
                  transition:
                    "background-color 0.3s ease, color 0.3s ease, border 0.3s ease",
                }}
                onClick={() => {
                  dispatch(
                    setCurrentSessionId({
                      currentSessionId: item.session_id,
                    })
                  );
                  dispatch(
                    setSelectedStoryTitle({
                      selectedStoryTitle: item.user_prompt,
                    })
                  );
                  onSelectEpisode("Episode-1");
                  dispatch(setMyStoriesNavigation({ myStoriesNavigation: 1 }));
                }}
                key={item.session_id}
              >
                {item.user_prompt.substring(0, is393Screen ? 15 : 20) + "..."}
              </ListItem>
            </Tooltip>
          );
        })
      )}
    </>
  );
};

export default SideBarDisplayAllStories;
