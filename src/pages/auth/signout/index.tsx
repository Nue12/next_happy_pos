import Layout from "@/components/Layout";
import {
  BackofficeContext,
  defaultBackOfficeContext,
} from "@/contexts/BackOfficeContext";
import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";

const Logout = () => {
  const { updateData } = useContext(BackofficeContext);

  useEffect(() => {
    localStorage.removeItem("accessToken");
    updateData(defaultBackOfficeContext);
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Typography variant="h3">You are logged out.</Typography>
      </Box>
    </Layout>
  );
};

export default Logout;
