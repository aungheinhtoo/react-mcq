import { Grid, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAppDispatch, useAppSelector } from "../util/redux/hooks";
import { setAnswer } from "../util/redux/quizSlice";
import { Answer, Question } from "../util/types";

interface ButtonMapType {
  option: Answer;
  answerText: string;
}

function QuizQuestion() {
  const currentQuestion: Question | null = useAppSelector((state) => {
    if (state.quiz.currentIndex < 0) return null;
    return state.quiz.questions[state.quiz.currentIndex];
  });

  const currentAnswer: Answer = useAppSelector((state) => {
    return state.quiz.answers[state.quiz.currentIndex];
  });

  const options: Map<Answer, string> = new Map();
  options.set(Answer.A, currentQuestion ? currentQuestion.option1 : "A");
  options.set(Answer.B, currentQuestion ? currentQuestion.option2 : "B");
  options.set(Answer.C, currentQuestion ? currentQuestion.option3 : "C");
  options.set(Answer.D, currentQuestion ? currentQuestion.option4 : "D");

  const buttonMaps: ButtonMapType[] = [];
  options.forEach((value, key) => {
    buttonMaps.push({ option: key, answerText: value });
  });

  const dispatch = useAppDispatch();

  return (
    <Stack sx={{ height: "80%" }} alignContent="stretch">
      <Stack
        sx={{ textAlign: "center", height: "40%" }}
        justifyContent="center"
      >
        <Typography variant="h6">{currentQuestion?.question}</Typography>
      </Stack>
      <Grid container spacing={3}>
        {buttonMaps.map((buttonMap) => {
          return (
            <Grid item xs={6} key={buttonMap.option}>
              <Card
                sx={{
                  minWidth: 275,
                  cursor: "pointer",
                  outline: `${
                    currentAnswer === buttonMap.option ? "2px solid white" : ""
                  }`,
                }}
                raised={currentAnswer === buttonMap.option}
                onClick={() => dispatch(setAnswer(buttonMap.option))}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {buttonMap.option}. {buttonMap.answerText}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default QuizQuestion;
