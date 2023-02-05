import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutProps {
  routes: { path: string; element: JSX.Element }[];
}

function Layout({ routes }: LayoutProps) {
  return (
    <Stack sx={{ height: "100vh" }}>
      <Navbar routes={routes} />
      <Outlet />
    </Stack>
  );
}

export default Layout;
