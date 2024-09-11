import React, { useEffect, useState } from "react";
import {
  Grid,
  List,
  Typography,
  Box,
  useMediaQuery,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import EpisodesList from "./EpisodesList";
import SideBarDisplayAllStories from "./SideBarDisplayAllStories";
import ChatHistory from "./ChatHistory";

const ChatLayout = () => {
  const is768Screen = useMediaQuery("(max-width:768px)");
  const is430Screen = useMediaQuery("(max-width:430px)");
  const is393Screen = useMediaQuery("(max-width:393px)");

  const { token } = useSelector((state) => state.mainReducer);
  const [selectedEpisode, setSelectedEpisode] = useState("Episode-1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onSelectEpisode = (episode) => {
    setSelectedEpisode(episode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {}, [token]);

  const sidebarContent = (
    <Box
      sx={{
        width: is393Screen ? "400px" : is430Screen ? "440px" : "460px",
        padding: "10px",
        borderRight: "1px solid #ddd",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          flex: 1,
          borderRight: "1px solid #fff",
          paddingRight: "10px",
          overflowY: "scroll",
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
        <Typography
          variant="h6"
          sx={{
            marginBottom: "10px",
            marginLeft: "5px",
          }}
        >
          Stories
        </Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            borderRight: "1px solid black",
            height: "auto",
            padding: is393Screen ? "8px 5px" : "0px 10px",
            width: is393Screen ? "200px" : is430Screen ? "260px" : "",
          }}
        >
          <SideBarDisplayAllStories onSelectEpisode={onSelectEpisode} />
        </List>
      </Box>
      <Box
        sx={{
          width: "160px",
          paddingRight: "10px",
          overflowY: "scroll",
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
        <Typography
          variant="h6"
          sx={{
            marginBottom: "10px",
            marginLeft: "5px",
          }}
        >
          Episodes
        </Typography>
        <EpisodesList
          selectedEpisode={selectedEpisode}
          onSelectEpisode={onSelectEpisode}
          onClickCloseSideBar={is430Screen ? toggleDropdown : toggleSidebar}
        />
      </Box>
    </Box>
  );

  return (
    <>
      {is768Screen && (
        <IconButton
          onClick={is430Screen ? toggleDropdown : toggleSidebar}
          sx={is430Screen ? { marginTop: "30px", position: "relative" } : {}}
        >
          <MenuIcon
            sx={{
              color: "#094b65",
              fontSize: "2rem",
            }}
          />
        </IconButton>
      )}
      <Grid
        container
        sx={
          is430Screen
            ? { position: "relative", height: "71vh" }
            : { height: is768Screen ? "76vh" : "66vh" }
        }
      >
        {is430Screen ? (
          <>
            {isOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: "0px",
                  left: -20,
                  // top: 0,
                  width: "460px",
                  maxHeight: "680px",
                  overflowY: "auto",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 1,
                }}
              >
                {sidebarContent}
              </Box>
            )}
          </>
        ) : is768Screen ? (
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            onClose={toggleSidebar}
            sx={{
              "& .MuiDrawer-paper": {
                width: "460px",
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        ) : (
          <Grid
            item
            sx={{
              borderRight: "1px solid #ddd",
              overflowY: "hidden",
              height: "100%",
              width: "38%",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                flex: 1,
                borderRight: "1px solid #fff",
                paddingRight: "10px",
                overflowY: "scroll",
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
              <Typography
                variant="h6"
                sx={{
                  marginBottom: "10px",
                  marginLeft: "5px",
                }}
              >
                Stories
              </Typography>
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <SideBarDisplayAllStories onSelectEpisode={onSelectEpisode} />
              </List>
            </Box>
            <Box
              sx={{
                width: "160px",
                paddingRight: "10px",
                overflowY: "scroll",
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
              <Typography
                variant="h6"
                sx={{
                  marginBottom: "10px",
                  marginLeft: "5px",
                }}
              >
                Episodes
              </Typography>
              <EpisodesList
                selectedEpisode={selectedEpisode}
                onSelectEpisode={onSelectEpisode}
              />
            </Box>
          </Grid>
        )}
        <Grid
          item
          sx={{
            padding: is430Screen ? "5px 0px" : "5px 15px",
            height: "100%",
            width: is768Screen ? "100%" : "62%",
          }}
        >
          <ChatHistory selectedEpisode={selectedEpisode} isOpen={isOpen} />
        </Grid>
      </Grid>
    </>
  );
};

export default ChatLayout;
