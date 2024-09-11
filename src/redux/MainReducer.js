import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user_id: null,
  username: null,
  isLoggedIn: false,
  navBarNavigation: 0,
  myStoriesNavigation: 0,
  currentSessionId: null,
  allStoriesOfCurrentUser: [],
  selectedStoryTitle: null,
  selectedEpisode: "Episode-1",
  noOfEpisodes: 0,
  leaderBoardNavigation: 0,
  leaderBoardSessionId: null,
  navBarIsOpen: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addUserDetails: (state, action) => {
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    removeUserDetails: (state) => {
      state.token = null;
      state.user_id = null;
      state.username = null;
      state.isLoggedIn = false;
      state.navBarNavigation = 0;
      state.myStoriesNavigation = 0;
      state.currentSessionId = null;
      state.allStoriesOfCurrentUser = null;
      state.selectedStoryTitle = null;
      state.selectedEpisode = "Episode-1";
      state.noOfEpisodes = 0;
      state.leaderBoardNavigation = 0;
      state.leaderBoardSessionId = null;
      state.navBarIsOpen = false;
    },
    setNavBarNavigation: (state, action) => {
      state.navBarNavigation = action.payload.navBarNavigation;
    },
    setMyStoriesNavigation: (state, action) => {
      state.myStoriesNavigation = action.payload.myStoriesNavigation;
    },
    setCurrentSessionId: (state, action) => {
      state.currentSessionId = action.payload.currentSessionId;
    },
    setAllStoriesOfCurrentUser: (state, action) => {
      state.allStoriesOfCurrentUser = action.payload.allStoriesOfCurrentUser;
    },
    setAppendNewStoryToAllStories: (state, action) => {
      const newStory = action.payload.newStory;
      state.allStoriesOfCurrentUser = [
        newStory,
        ...state.allStoriesOfCurrentUser,
      ];
    },
    setSelectedStoryTitle: (state, action) => {
      state.selectedStoryTitle = action.payload.selectedStoryTitle;
    },
    setSelectedEpisode: (state, action) => {
      state.selectedEpisode = action.payload.selectedEpisode;
    },
    setNoOfEpisodes: (state, action) => {
      state.noOfEpisodes = action.payload.noOfEpisodes;
    },
    setLeaderBoardNavigation: (state, action) => {
      state.leaderBoardNavigation = action.payload.leaderBoardNavigation;
    },
    setLeaderBoardSessionId: (state, action) => {
      state.leaderBoardSessionId = action.payload.leaderBoardSessionId;
    },
    setNavBarIsOpen: (state, action) => {
      state.navBarIsOpen = action.payload.navBarIsOpen;
    },
  },
});

export const {
  addUserDetails,
  removeUserDetails,
  setNavBarNavigation,
  setMyStoriesNavigation,
  setCurrentSessionId,
  setAllStoriesOfCurrentUser,
  setAppendNewStoryToAllStories,
  setSelectedStoryTitle,
  setSelectedEpisode,
  setNoOfEpisodes,
  setLeaderBoardNavigation,
  setLeaderBoardSessionId,
  setNavBarIsOpen,
} = mainSlice.actions;
export default mainSlice.reducer;
