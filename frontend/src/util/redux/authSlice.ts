/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types";

const storedAuthState: AuthState | null =
  localStorage.getItem("authState") !== null
    ? JSON.parse(localStorage.getItem("authState") ?? "")
    : null;
const initialState: AuthState = storedAuthState ?? {
  token: null,
  username: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState | null>) => {
      state.token = action.payload?.token ?? null;
      state.username = action.payload?.username ?? null;
      state.isLoggedIn = true;
      localStorage.setItem("authState", JSON.stringify(action.payload));
    },
    clearAuth: (state) => {
      state.token = null;
      state.username = null;
      state.isLoggedIn = false;
      localStorage.removeItem("authState");
    },
  },
});
export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
