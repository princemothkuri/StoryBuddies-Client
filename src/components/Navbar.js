import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNavBarIsOpen, setNavBarNavigation } from "../redux/MainReducer";
import { useMediaQuery } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { navBarNavigation } = useSelector((state) => state.mainReducer);

  const is430Screen = useMediaQuery("(max-width:430px)");

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      document.body.classList.remove("no-scroll");
      dispatch(setNavBarIsOpen({ navBarIsOpen: false }));
    } else {
      document.body.classList.add("no-scroll");
      dispatch(setNavBarIsOpen({ navBarIsOpen: true }));
    }
  };

  return (
    <>
      <header id="header" style={is430Screen ? { padding: "30px 25px" } : {}}>
        <p
          className="logo"
          onClick={() => {
            dispatch(setNavBarNavigation({ navBarNavigation: 0 }));
            navigate("/");
          }}
        >
          StoryBuddies
        </p>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <ul style={{ top: isOpen ? "80px" : "0px" }}>
            <li style={isOpen ? { fontSize: "28px", fontWeight: 600 } : {}}>
              <p
                className={navBarNavigation === 1 ? "active" : ""}
                onClick={() => {
                  dispatch(setNavBarNavigation({ navBarNavigation: 1 }));

                  navigate("/leaderboard");
                }}
              >
                Leaderboard
              </p>
            </li>
            <li style={isOpen ? { fontSize: "28px", fontWeight: 600 } : {}}>
              <p
                className={navBarNavigation === 2 ? "active" : ""}
                onClick={() => {
                  dispatch(setNavBarNavigation({ navBarNavigation: 2 }));
                  navigate("/my-stories");
                }}
              >
                My Stories
              </p>
            </li>
            <li style={isOpen ? { fontSize: "28px", fontWeight: 600 } : {}}>
              <p
                className={navBarNavigation === 3 ? "active" : ""}
                onClick={() => {
                  dispatch(setNavBarNavigation({ navBarNavigation: 3 }));
                  navigate("/profile");
                }}
              >
                Profile
              </p>
            </li>
            <li style={isOpen ? { fontSize: "28px", fontWeight: 600 } : {}}>
              <p
                onClick={() => {
                  dispatch(setNavBarNavigation({ navBarNavigation: 0 }));
                  navigate("/logout");
                }}
              >
                Logout
              </p>
            </li>
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
