import React from "react";
import { List, ListItem, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const EpisodesList = ({
  selectedEpisode,
  onSelectEpisode,
  onClickCloseSideBar,
}) => {
  const { noOfEpisodes } = useSelector((state) => state.mainReducer);
  const is768Screen = useMediaQuery("(max-width:768px)");
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        "&::-webkit-scrollbar": {
          width: "0px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "none",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
      }}
    >
      {noOfEpisodes === 0 ? (
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
            Select a Story...
          </p>
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
                if (is768Screen) {
                  onClickCloseSideBar();
                }
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

export default EpisodesList;
