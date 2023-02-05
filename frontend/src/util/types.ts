export interface Question {
  id: number;
  index?: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

export interface Quiz {
  id: number;
  questions: Question[];
  title: string | null;
}

export enum Answer {
  "A" = "A",
  "B" = "B",
  "C" = "C",
  "D" = "D",
  "Unanswered" = 0,
}

export interface AuthState {
  token: string | null;
  username: string | null;
  isLoggedIn: boolean;
}
