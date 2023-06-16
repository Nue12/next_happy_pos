import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useContext, useState } from "react";
import { BackofficeContext } from "@/contexts/BackOfficeContext";

interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  const { isLoading } = useContext(BackofficeContext);
  if (isLoading) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <TopBar title={props.title} />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <SideBar />
        <Box sx={{ p: 3, width: "100%" }}>{props.children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
