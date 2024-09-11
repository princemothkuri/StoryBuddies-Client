import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Corrected import for CssBaseline

import LoginPage from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LeaderBoard from "./pages/leaderboard/LeaderBoard";
import Logout from "./pages/auth/Logout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/home/HomePage";
import MyStories from "./pages/myStories/MyStories";
import ProfilePage from "./pages/profile/ProfilePage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";

const Layout = () => {
  return (
    <div>
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoard />,
      },
      {
        path: "/my-stories",
        element: <MyStories />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/forgot-password",
        element: <ForgetPasswordPage />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
export default App;
