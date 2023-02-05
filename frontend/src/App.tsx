import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { pink } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { store } from "./util/redux/store";
import Home from "./screens/Home";
import Layout from "./components/Layout";
import Results from "./screens/Results";
import NoMatch from "./screens/NoMatch";
import Dashboard from "./screens/Dashboard";
import Quiz from "./screens/Quiz";
import Login from "./screens/Login";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

interface RouteConfig {
  path: string;
  element: JSX.Element;
}

const queryClient = new QueryClient();

function App() {
  const routes: RouteConfig[] = [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "results",
      element: <Results />,
    },
  ];

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
    status: {
      danger: pink[500],
    },
  });

  return (
    <SnackbarProvider maxSnack={1}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Layout routes={routes} />}>
                    <Route index element={<Home />} />
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                    <Route path="/quiz/:quizID" element={<Quiz />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NoMatch />} />
                  </Route>
                </Routes>
              </div>
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
