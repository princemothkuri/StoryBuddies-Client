// LoadingSkeleton.js
import React from "react";
import {
  Skeleton,
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";

const LoadingSkeleton = ({ size, numberOfCards }) => {
  const is430Screen = useMediaQuery("(max-width:430px)");
  const is393Screen = useMediaQuery("(max-width:393px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: size ? "column" : "row",
        justifyContent: is430Screen ? "center" : "self-start",
        flexWrap: "wrap",
        alignItems: size ? "center" : "self-start",
        gap: 3,
        width: is430Screen ? "100%" : null,
        marginLeft: is393Screen ? "0px" : is430Screen ? "20px" : null,
      }}
    >
      {[...Array(numberOfCards)].map((_, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            backgroundColor: "transparent",
            width: size ? "100%" : "auto",
            boxShadow: size ? "2px 2px 10px rgba(0, 0, 0, 0.3)" : "",
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{ minWidth: size ? "100%" : "340px" }}
            height={168}
          />
          <CardContent>
            <Typography variant="h6">
              <Skeleton width="80%" />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Skeleton width="60%" />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default LoadingSkeleton;
