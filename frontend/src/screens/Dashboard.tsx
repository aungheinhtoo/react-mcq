import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Loading from "../components/Loading";
import { getQuizList } from "../util/api";
import { useAppDispatch } from "../util/redux/hooks";
import { clearAuth } from "../util/redux/authSlice";

function Dashboard() {
  // Queries
  const { isLoading, isError, data } = useQuery({
    queryKey: ["quizList"],
    queryFn: getQuizList,
  });
  const dispatch = useAppDispatch();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  if (isError) {
    dispatch(clearAuth());
    enqueueSnackbar("Please login", { variant: "info" });
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h6">
        Choose one of the quizzes below. Your previous result will get cleared
        once you click on the quiz.
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          outline: "1px solid white",
          borderRadius: "5px",
        }}
      >
        {data.map((quiz) => (
          <ListItem key={quiz.id}>
            <ListItemButton component={Link} to={`/quiz/${quiz.id}`}>
              <ListItemText primary={quiz.title ?? "Untitled Quiz"} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Dashboard;
