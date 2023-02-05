import { Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { Navigate } from "react-router-dom";
import ResultQuestion from "../components/ResultQuestion";
import { clearAuth } from "../util/redux/authSlice";
import { useAppDispatch, useAppSelector } from "../util/redux/hooks";
import { AuthState } from "../util/types";

function Results() {
  const quizState = useAppSelector((state) => {
    return state.quiz;
  });
  const authState: AuthState = useAppSelector((state) => {
    return state.auth;
  });

  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  if (!authState.isLoggedIn) {
    dispatch(clearAuth());
    enqueueSnackbar("Please login", { variant: "info" });
    return <Navigate to="/login" />;
  }
  if (
    quizState.finished === false ||
    quizState.answers.length !== quizState.questions.length
  ) {
    enqueueSnackbar("Please complete a quiz first.", { variant: "info" });
    return <Navigate to="/dashboard" />;
  }

  return (
    <Stack alignItems="center" justifyContent="center">
      <Typography variant="h5" gutterBottom>
        Results for the latest quiz
      </Typography>
      <Typography variant="body1" gutterBottom>
        You scored {quizState.score} out of {quizState.questions.length} points.
      </Typography>
      {quizState.questions.map((question, index) => (
        <ResultQuestion
          question={question}
          answer={quizState.answers[index]}
          index={index}
          key={question.id}
        />
      ))}
    </Stack>
  );
}

export default Results;
