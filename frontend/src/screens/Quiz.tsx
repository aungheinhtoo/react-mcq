import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Button, Pagination, Stack, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSnackbar } from "notistack";
import { getQuiz } from "../util/api";
import Loading from "../components/Loading";
import { useAppSelector, useAppDispatch } from "../util/redux/hooks";
import {
  loadQuestions,
  setQuestionNumber,
  startQuiz,
  finishQuiz,
} from "../util/redux/quizSlice";
import { Answer, AuthState } from "../util/types";
import QuizQuestion from "../components/QuizQuestion";
import { clearAuth } from "../util/redux/authSlice";

type QuizParams = {
  quizID: string;
};

enum PaginationItemColors {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  STANDARD = "standard",
}

function Quiz() {
  const params = useParams<QuizParams>();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const openloginSnackbar = useCallback(() => {
    enqueueSnackbar("Please log in.", { variant: "info" });
  }, [enqueueSnackbar]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setQuestionNumber(value - 1));
    setPage(value);
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["currQuiz", params],
    queryFn: () => getQuiz(params.quizID ?? ""),
  });

  const quizState = useAppSelector((state) => {
    return state.quiz;
  });

  const { currentIndex } = quizState;

  const allCompleted: boolean = useAppSelector((state) => {
    return !state.quiz.answers.some((answer) => answer === Answer.Unanswered);
  });

  const authState: AuthState = useAppSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    if (!isError && !isLoading) {
      dispatch(loadQuestions(data.questions));
    }
  }, [data, dispatch, isError, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (!authState.isLoggedIn || isError) {
    dispatch(clearAuth());
    openloginSnackbar();
    return <Navigate to="login" />;
  }

  if (currentIndex < 0) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Button onClick={() => dispatch(startQuiz())} variant="outlined">
          Get Started
        </Button>
      </Stack>
    );
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >
      <QuizQuestion />
      <Stack gap={1} sx={{ height: "20%" }} justifyContent="flex-end">
        {allCompleted ? (
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(finishQuiz());
              navigate("/results");
            }}
          >
            Submit
          </Button>
        ) : null}
        <Pagination
          count={data.questions.length}
          page={page}
          onChange={handleChange}
          variant="outlined"
          size="large"
          renderItem={(item) => {
            const curPage = item.page ?? 0;
            let color: PaginationItemColors;
            if (curPage - 1 === quizState.currentIndex) {
              color = PaginationItemColors.PRIMARY;
            } else if (
              item.type === "page" &&
              curPage > 0 &&
              quizState.answers[curPage - 1] === Answer.Unanswered
            ) {
              color = PaginationItemColors.SECONDARY;
            } else {
              color = PaginationItemColors.STANDARD;
            }
            return (
              <PaginationItem
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...item}
                selected
                color={color}
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              />
            );
          }}
        />
      </Stack>
    </Stack>
  );
}

export default Quiz;
