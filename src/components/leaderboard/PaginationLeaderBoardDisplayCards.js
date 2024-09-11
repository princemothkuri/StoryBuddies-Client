import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { fetchPaginationLeaderBoard } from "../../utils/ApiCalls/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  setLeaderBoardNavigation,
  setLeaderBoardSessionId,
  setNavBarIsOpen,
} from "../../redux/MainReducer";

const PaginationLeaderBoardDisplayCards = () => {
  const dispatch = useDispatch();

  const is430Screen = useMediaQuery("(max-width:430px)");

  const { navBarIsOpen } = useSelector((state) => state.mainReducer);

  const [leaderboard, setLeaderboard] = useState([]);
  const [filteredLeaderboard, setFilteredLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetchPaginationLeaderBoard(1);
        setLeaderboard(response.data.leaderboard);
        setFilteredLeaderboard(response.data.leaderboard);
        setPage(2);
      } catch (error) {
        console.error("Error fetching initial leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    dispatch(setNavBarIsOpen({ navBarIsOpen: false }));
    fetchInitialData();
  }, [dispatch]);

  const fetchMoreData = async () => {
    try {
      setIsLoadingMore(true);
      const response = await fetchPaginationLeaderBoard(page);
      setLeaderboard((prev) => [...prev, ...response.data.leaderboard]);
      setFilteredLeaderboard((prev) => [...prev, ...response.data.leaderboard]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching more leaderboard data:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = leaderboard.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLeaderboard(filtered);
    } else {
      setFilteredLeaderboard(leaderboard);
    }
  };

  const handleScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
      !searchTerm &&
      !isLoadingMore
    ) {
      fetchMoreData();
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        display: !navBarIsOpen ? "block" : "none",
        width: "100%",
        height: "100%",
      }}
    >
      <div>
        <TextField
          variant="standard"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Title"
          sx={{
            width: is430Screen ? "100%" : "400px",
            marginBottom: 3,
            "& .MuiInput-underline:after": {
              borderBottomColor: "#094b65",
            },
          }}
          InputProps={{
            disableUnderline: false,
          }}
        />
      </div>
      {filteredLeaderboard.length === 0 ? (
        <>
          <p
            style={{
              height: "50vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              color: "#094b65",
            }}
          >
            No Stories...
          </p>
        </>
      ) : searchTerm && filteredLeaderboard.length === 0 ? (
        <>
          <p
            style={{
              width: "100%",
              height: "60%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "#1d5c75",
              fontWeight: "600",
            }}
          >
            No Stories Found...
          </p>
        </>
      ) : (
        <>
          <Grid
            container
            spacing={2}
            padding={2}
            sx={{
              overflowY: "scroll",
              height: "90%",

              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#1d5c75",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },

              padding: "10px",
            }}
            onScroll={handleScroll}
          >
            {filteredLeaderboard?.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item._id}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => {
                    dispatch(
                      setLeaderBoardSessionId({
                        leaderBoardSessionId: item.session_id,
                      })
                    );
                    dispatch(
                      setLeaderBoardNavigation({ leaderBoardNavigation: 1 })
                    );
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {item.title.substring(0, 30) + "..."}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {item.story.substring(0, 400) + "..."}
                      </Typography>
                    </Box>
                    <Box mt={2} pt={2} borderTop="1px solid black">
                      <Typography color="textSecondary">
                        Created at:{" "}
                        {new Date(item.created_at).toLocaleDateString()}
                      </Typography>
                      <Typography>Upvotes: {item.upvotes}</Typography>
                      <Typography>Downvotes: {item.downvotes}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {isLoadingMore && (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

export default PaginationLeaderBoardDisplayCards;
