import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { pink } from "@mui/material/colors";
import { Answer, Question } from "../util/types";

enum Color {
  success = "success",
  error = "error",
  default = "default",
}

enum Variant {
  outlined = "outlined",
  filled = "filled",
}

interface ResultQuestionProp {
  question: Question;
  answer: Answer;
  index: number;
}

function QuestionChip(
  optionLetter: string,
  optionText: string,
  correct: boolean,
  picked: boolean,
) {
  let colorStr: Color;
  let variantStr: Variant;
  if (correct && picked) {
    colorStr = Color.success;
    variantStr = Variant.filled;
  } else if (correct && !picked) {
    colorStr = Color.success;
    variantStr = Variant.outlined;
  } else if (!correct && picked) {
    colorStr = Color.error;
    variantStr = Variant.filled;
  } else {
    colorStr = Color.default;
    variantStr = Variant.outlined;
  }
  return (
    <Chip
      label={`${optionLetter}. ${optionText}`}
      color={colorStr}
      variant={variantStr}
    />
  );
}

export default function ResultQuestion(props: ResultQuestionProp) {
  const { question, answer, index } = props;
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>{`${index + 1}. ${question.question}`}</Typography>
        {question.answer === answer ? (
          <CheckCircleIcon color="success" />
        ) : (
          <CancelIcon sx={{ color: pink[500] }} />
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={1}>
          {QuestionChip(
            "A",
            question.option1,
            question.answer === Answer.A,
            answer === Answer.A,
          )}
          {QuestionChip(
            "B",
            question.option2,
            question.answer === Answer.B,
            answer === Answer.B,
          )}
          {QuestionChip(
            "C",
            question.option3,
            question.answer === Answer.C,
            answer === Answer.C,
          )}
          {QuestionChip(
            "D",
            question.option4,
            question.answer === Answer.D,
            answer === Answer.D,
          )}
        </Stack>
        <Typography>Your Answer: {answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
