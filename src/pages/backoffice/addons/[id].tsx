import Layout from "@/components/Layout";
import { BackofficeContext } from "@/contexts/BackOfficeContext";
import { getselectedLocationId } from "@/utils";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const EditAddon = () => {
  const router = useRouter();
  const addonId = router.query.id as string;
  const selectedLocationId = getselectedLocationId() as string;
  const { addons } = useContext(BackofficeContext);
  const addon = addons.find((addon) => addon.id === Number(addonId));

  const updateAddon = () => {
    console.log("update addon");
  };

  return (
    <Layout title="Edit Addon">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField defaultValue={addon?.name} sx={{ mb: 2 }} />
        <TextField defaultValue={addon?.price} sx={{ mb: 2 }} />
        <Button
          variant="contained"
          onClick={updateAddon}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditAddon;
