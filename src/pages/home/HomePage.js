import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Navbar from "../../components/Navbar";
import FeaturedStories from "../../components/home/FeaturedStories";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSessionId,
  setMyStoriesNavigation,
  setNavBarIsOpen,
  setNavBarNavigation,
  setNoOfEpisodes,
  setSelectedStoryTitle,
} from "../../redux/MainReducer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, token, navBarIsOpen } = useSelector(
    (state) => state.mainReducer
  );

  const [scrollY, setScrollY] = useState(window.scrollY);

  const is1024Screen = useMediaQuery("(max-width:1024px)");
  const is768Screen = useMediaQuery("(max-width:768px)");
  const is430Screen = useMediaQuery("(max-width:430px)");

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;
      setScrollY(value);

      const initialMarginTop = is768Screen ? -350 : is1024Screen ? -170 : -100; // Adjust initial marginTop based on screen size

      if (value === 0) {
        document.getElementById(
          "btns"
        ).style.marginTop = `${initialMarginTop}px`;
      } else {
        document.getElementById("text").style.top =
          (is768Screen ? 57.9 : is1024Screen ? 40 : 36) + value * -0.1 + "%";
        document.getElementById("bird2").style.top = value * -1.5 + "px";
        document.getElementById("bird2").style.left = value * 2 + "px";
        document.getElementById("bird1").style.top = value * -1.5 + "px";
        document.getElementById("bird1").style.left = value * -5 + "px";
        document.getElementById("btns").style.marginTop =
          initialMarginTop + value * 1.5 + "px";
        document.getElementById("rocks").style.top = value * -0.03 + "px";
        document.getElementById("forest").style.top = value * 0.25 + "px";
        document.getElementById("header").style.top = value * 0.5 + "px";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [is1024Screen, is768Screen]);

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    dispatch(setNavBarNavigation({ navBarNavigation: 0 }));
    dispatch(setNavBarIsOpen({ navBarIsOpen: false }));
  }, [token, dispatch, navigate]);

  return (
    <>
      <Navbar />
      <div style={{ display: navBarIsOpen ? "none" : "block" }}>
        <section>
          <h2
            id="text"
            style={{
              marginTop: is768Screen
                ? "-260px"
                : is1024Screen
                ? "-30px"
                : "0px",
              zIndex: "2",
              fontSize: is430Screen ? "3.3rem" : null,
            }}
          >
            Welcome, {username}
            <br />
            <span>Imagination is the key to endless stories...</span>
          </h2>

          <img
            src="./assests/1.png"
            id="bird1"
            alt="bird1"
            style={
              is430Screen
                ? { display: "none" }
                : is1024Screen
                ? {
                    width: "500px",
                    marginLeft: "250px",
                    display: scrollY > 94 ? "none" : "block",
                    zIndex: "5",
                  }
                : { zIndex: "5" }
            }
          />
          <img
            src="./assests/2.png"
            id="bird2"
            alt="bird2"
            style={
              is430Screen
                ? { display: "none" }
                : is1024Screen
                ? {
                    width: "500px",
                    marginLeft: "250px",
                    display: scrollY > 94 ? "none" : "block",
                    zIndex: "5",
                  }
                : { zIndex: "5" }
            }
          />

          <img src="./assests/3.png" id="forest" alt="forest" />

          <div
            id="btns"
            style={
              is430Screen
                ? {
                    marginTop: is430Screen
                      ? "-300px"
                      : is768Screen
                      ? "-350px"
                      : is1024Screen
                      ? "-170px"
                      : "-100px",
                    display: "flex",
                    flexDirection: "column",
                  }
                : {
                    marginTop: is768Screen
                      ? "-350px"
                      : is1024Screen
                      ? "-170px"
                      : "-100px",
                  }
            }
          >
            <button
              className="start"
              onClick={() => {
                navigate("/my-stories");
                dispatch(setSelectedStoryTitle({ selectedStoryTitle: null }));
                dispatch(setMyStoriesNavigation({ myStoriesNavigation: 2 }));
                dispatch(setCurrentSessionId({ currentSessionId: null }));
                dispatch(setNoOfEpisodes({ noOfEpisodes: 0 }));
              }}
            >
              Start a New Story
            </button>
            <button
              className="continue"
              onClick={() => {
                navigate("/my-stories");
                dispatch(setSelectedStoryTitle({ selectedStoryTitle: null }));
                dispatch(setMyStoriesNavigation({ myStoriesNavigation: 0 }));
                dispatch(setCurrentSessionId({ currentSessionId: null }));
                dispatch(setNoOfEpisodes({ noOfEpisodes: 0 }));
              }}
            >
              Continue a Story
            </button>
          </div>

          <img
            src="./assests/4.png"
            id="rocks"
            alt="rocks"
            style={{ marginTop: is1024Screen ? "20px" : null }}
          />
          <img
            src="./assests/5.png"
            id="water"
            alt="water"
            style={{ marginTop: is1024Screen ? "20px" : null }}
          />
        </section>
        <div
          className="sec"
          style={
            is430Screen
              ? { padding: "50px 0px" }
              : is1024Screen
              ? { padding: "100px 20px" }
              : {}
          }
        >
          <h2
            style={
              is430Screen ? { fontSize: "2.3rem", padding: "0px 20px" } : {}
            }
          >
            Featured Stories
          </h2>
          <FeaturedStories />
        </div>
      </div>
    </>
  );
};

export default HomePage;
