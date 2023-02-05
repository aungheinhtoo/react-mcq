import { Button, Stack, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { login } from "../util/api";
import { useAppDispatch } from "../util/redux/hooks";
import { setAuth } from "../util/redux/authSlice";
import Loading from "../components/Loading";

interface LoginInfo {
  username: string;
  password: string;
}

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();
  const mutation = useMutation(
    (data: LoginInfo) => {
      return login(data.username, data.password);
    },
    {
      onSuccess: (data) => {
        dispatch(
          setAuth({
            token: data.token,
            username,
            isLoggedIn: true,
          }),
        );
        return navigate("/dashboard");
      },
      onError: () => {
        enqueueSnackbar("Login Failed", { variant: "error" });
      },
    },
  );
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack
        alignItems="center"
        direction="column"
        justifyContent="center"
        gap={2}
        sx={{
          paddingTop: "10px",
          width: "50%",
        }}
      >
        <Typography variant="h6">Sign In with</Typography>
        <Typography variant="body2">
          username: test, password: Test123%
        </Typography>
        <TextField
          fullWidth
          label="Username"
          id="username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          id="password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="outlined"
          startIcon={mutation.isLoading ? <Loading /> : <LockIcon />}
          onClick={() => mutation.mutate({ username, password })}
        >
          Sign In
        </Button>
      </Stack>
    </Box>
  );
}
