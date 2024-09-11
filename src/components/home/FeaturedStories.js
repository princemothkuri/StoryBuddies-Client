import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { getFeaturedStories } from "../../utils/ApiCalls/ApiCalls";
import LoadingSkeleton from "../../utils/loadings/LoadingSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  setLeaderBoardNavigation,
  setLeaderBoardSessionId,
} from "../../redux/MainReducer";
import { useNavigate } from "react-router-dom";

const FeaturedStories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.mainReducer);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await getFeaturedStories(token);
        setStories(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [token]);

  if (loading) {
    return <LoadingSkeleton size={false} numberOfCards={6} />;
  }

  if (error) {
    return <Typography>Error fetching stories: {error.message}</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {stories.length === 0 ? (
          <>
            <p style={{ width: "100%", textAlign: "start", marginTop: "20px" }}>
              No Featured Stories...
            </p>
          </>
        ) : (
          stories?.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story._id}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  boxShadow: 3,
                  height: "100%",

                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  dispatch(
                    setLeaderBoardSessionId({
                      leaderBoardSessionId: story.session_id,
                    })
                  );
                  dispatch(
                    setLeaderBoardNavigation({ leaderBoardNavigation: 1 })
                  );
                  navigate("/leaderboard");
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", mb: 2, color: "white" }}
                  >
                    {story.title}
                  </Typography>
                  <Typography variant="body2">
                    {story.story.length > 300 ? (
                      <>
                        {story.story.slice(0, 330)} ...<span>Read more</span>
                      </>
                    ) : (
                      story.story
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default FeaturedStories;
