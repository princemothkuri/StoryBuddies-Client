import axios from "axios";

const API_URL = "https://storybuddies-server.onrender.com";

// User Authentication
export const register = (userData) =>
  axios.post(`${API_URL}/register`, userData);

export const login = (userData) => axios.post(`${API_URL}/login`, userData);

// Forget Password - Verify Email
export const verifyEmail = (email) =>
  axios.post(`${API_URL}/verify-email`, { email });

// Forget Password - Reset Password
export const resetPassword = (email, password) =>
  axios.post(`${API_URL}/reset-password`, { email, password });

// Featured-Stories
export const getFeaturedStories = (token) =>
  axios.post(
    `${API_URL}/featured-stories`,
    { token: token },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

// Fetch Current User Stories
export const fetchCurrentUserStories = (token) =>
  axios.post(
    `${API_URL}/fetch_first_message_of_each_session_of_current_user`,
    { token: token },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

// Fetch total story by using session ID
export const fetch_total_story_by_using_session = (token, session_id) =>
  axios.post(
    `${API_URL}/fetch_total_story_by_using_session`,
    { token: token, session_id: session_id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

// Send Message to get the story (new or continue)
export const sendMessage = (token, session_id, tags, content) =>
  axios.post(
    `${API_URL}/send_message`,
    { token, session_id, tags, content },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

// Fetch Pagination LeaderBoard
export const fetchPaginationLeaderBoard = (page) =>
  axios.get(
    `${API_URL}/leaderboard?page=${page}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

// Fetch Complete Story By Using SessionId
export const fetchCompleteStoryByUsingSessionId = (token, session_id) =>
  axios.post(
    `${API_URL}/fetch_total_story_by_using_session`,
    {
      token,
      session_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

// Upvote ApiCall
export const upvoteApiCall = (token, session_id, message_id) =>
  axios.post(
    `${API_URL}/upvote`,
    { token, session_id, message_id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

// Downvote ApiCall
export const downvoteApiCall = (token, session_id, message_id) =>
  axios.post(
    `${API_URL}/downvote`,
    { token, session_id, message_id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

// Fetch current user Profile
export const fetchProfile = (token) =>
  axios.post(
    `${API_URL}/profile`,
    { token },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
