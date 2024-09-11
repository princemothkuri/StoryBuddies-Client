import { Tooltip, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";

const LeaderBoardTypingEffect = ({ selectedStoryTitle }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  const is768Screen = useMediaQuery("(max-width:768px)");
  const is430Screen = useMediaQuery("(max-width:430px)");
  const is393Screen = useMediaQuery("(max-width:393px)");

  useEffect(() => {
    let truncatedStoryTitle = selectedStoryTitle;

    if (
      truncatedStoryTitle.length >
      (is393Screen ? 18 : is430Screen ? 20 : is768Screen ? 40 : 50)
    ) {
      truncatedStoryTitle =
        truncatedStoryTitle.substring(
          0,
          is393Screen ? 18 : is430Screen ? 20 : is768Screen ? 40 : 50
        ) + "...";
    }

    if (index < truncatedStoryTitle.length) {
      const timer = setInterval(() => {
        setDisplayText((prev) => prev + truncatedStoryTitle[index]);
        setIndex((prev) => prev + 1);
      }, 100);

      return () => clearInterval(timer);
    }
  }, [index, is430Screen, is768Screen, selectedStoryTitle]);

  useEffect(() => {
    setDisplayText("");
    setIndex(0);
  }, [selectedStoryTitle]);

  return (
    <Tooltip title={selectedStoryTitle} arrow>
      <span style={{ fontSize: "20px" }}>{displayText}</span>
    </Tooltip>
  );
};

export default LeaderBoardTypingEffect;
