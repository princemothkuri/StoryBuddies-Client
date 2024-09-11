import React from "react";
import { List, ListItem } from "@mui/material";

const LeaderBoardEpisodeList = ({
  selectedEpisode,
  onSelectEpisode,
  noOfEpisodes,
  toggleDrawer,
}) => {
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {noOfEpisodes === 0 ? (
        <>
          <p style={{ fontSize: "16px", padding: "10px 10px" }}>No Episodes</p>
        </>
      ) : (
        Array.from({ length: noOfEpisodes }).map((_, index) => {
          const episodeName = `Episode-${index + 1}`;
          const isActive = selectedEpisode === episodeName;

          return (
            <ListItem
              button
              key={`episode-${index}`}
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
                onSelectEpisode(episodeName);
                toggleDrawer();
              }}
            >
              {episodeName}
            </ListItem>
          );
        })
      )}
    </List>
  );
};

export default LeaderBoardEpisodeList;
