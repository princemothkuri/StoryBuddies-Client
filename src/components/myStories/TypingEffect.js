import React, { useState, useEffect } from "react";
import { Tooltip, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const TypingEffect = () => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  const is1024Screen = useMediaQuery("(max-width:1024px)");
  const is768Screen = useMediaQuery("(max-width:768px)");

  const { selectedStoryTitle } = useSelector((state) => state.mainReducer);

  useEffect(() => {
    let truncatedStoryTitle = selectedStoryTitle;

    if (truncatedStoryTitle.length > (is1024Screen ? 30 : 50)) {
      truncatedStoryTitle =
        truncatedStoryTitle.substring(0, is1024Screen ? 30 : 50) + "...";
    }

    if (index < truncatedStoryTitle.length) {
      const timer = setInterval(() => {
        setDisplayText((prev) => prev + truncatedStoryTitle[index]);
        setIndex((prev) => prev + 1);
      }, 100);

      return () => clearInterval(timer);
    }
  }, [index, is1024Screen, selectedStoryTitle]);

  useEffect(() => {
    setDisplayText("");
    setIndex(0);
  }, [selectedStoryTitle, is1024Screen]);

  return (
    <Tooltip title={selectedStoryTitle} arrow>
      <span style={{ fontSize: is768Screen ? "18px" : "22px" }}>
        {displayText}
      </span>
    </Tooltip>
  );
};

export default TypingEffect;
