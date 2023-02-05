/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Answer, Question } from "../types";

interface QuizState {
  questions: Question[];
  answers: Answer[];
  currentIndex: number;
  finished: boolean;
  score: number;
}

const initialState: QuizState = {
  questions: [],
  answers: [],
  currentIndex: -1,
  finished: false,
  score: 0,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    loadQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      // Initialize the answers as unanswered first.
      action.payload.forEach((question, index) => {
        state.answers[index] = Answer.Unanswered;
      });
      state.finished = false;
    },
    startQuiz: (state) => {
      if (state.questions.length > 0) {
        state.currentIndex = 0;
        state.score = 0;
        state.finished = false;
      }
    },
    setAnswer: (state, action: PayloadAction<Answer>) => {
      state.answers[state.currentIndex] = action.payload;
    },
    setQuestionNumber: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.questions.length) {
        state.currentIndex = action.payload;
      }
    },
    finishQuiz: (state) => {
      let score = 0;
      for (let i = 0; i < state.answers.length; i += 1) {
        if (state.answers[i] === state.questions[i].answer) {
          score += 1;
        }
      }
      state.score = score;
      state.finished = true;
      state.currentIndex = -1;
    },
  },
});

export const {
  loadQuestions,
  startQuiz,
  setAnswer,
  setQuestionNumber,
  finishQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
