import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const LeaderBoardLoading = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100%", padding: 2, overflow: "hidden" }}
    >
      {/* Left side: 30% width for list loading */}
      <Grid item xs={4} sx={{ padding: 2 }}>
        <Box>
          {[...Array(12)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={50}
              sx={{ marginBottom: 2 }}
            />
          ))}
        </Box>
      </Grid>

      {/* Right side: 70% width for cards loading */}
      <Grid item xs={8} sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <Skeleton
                variant="rectangular"
                height={200}
                width="100%"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LeaderBoardLoading;
