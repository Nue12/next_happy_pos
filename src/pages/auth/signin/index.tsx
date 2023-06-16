import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import Layout from "@/components/Layout";
import { Box, Button, TextField } from "@mui/material";

const SignIn = () => {
  return (
    <Layout title="Happy POS - Sign in">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Button
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Sign in with Google
        </Button>
      </Box>
    </Layout>
  );
};

export default SignIn;
