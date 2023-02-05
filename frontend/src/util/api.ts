import { AuthState, Quiz } from "./types";

const BASE_URL: string = "http://localhost:8000";

interface TokenResponse {
  token: string;
}

export async function getQuizList(): Promise<Quiz[]> {
  const authString: string | null = localStorage.getItem("authState");
  const authState: AuthState | null = authString
    ? JSON.parse(authString)
    : null;
  const token = authState ? authState.token : null;
  const res = await fetch(`${BASE_URL}/questionset/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Get Quiz List Failed");
  }
  const ret = await res.json();
  return ret;
}

export async function getQuiz(id: string): Promise<Quiz> {
  const authString: string | null = localStorage.getItem("authState");
  const authState: AuthState | null = authString
    ? JSON.parse(authString)
    : null;
  const token = authState ? authState.token : null;
  const res = await fetch(`${BASE_URL}/questionset/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Get Quiz Failed");
  }
  const ret = await res.json();
  return ret;
}

export async function login(
  username: string,
  password: string,
): Promise<TokenResponse> {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (!res.ok) {
    throw new Error("Login Failed");
  }
  const ret = await res.json();
  return ret;
}
