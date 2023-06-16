import Layout from "@/components/Layout";
import { BackofficeContext } from "@/contexts/BackOfficeContext";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { addon_categories as AddonCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const EditAddonCategories = () => {
  const router = useRouter();
  const addonCategoryId = router.query.id as string;
  const { addonCategories } = useContext(BackofficeContext);
  const selectedAddonCategory = addonCategories.find(
    (item) => item.id === Number(addonCategoryId)
  );
  const [newAddonCategory, setNewAddonCategory] = useState<
    Partial<AddonCategory> | undefined
  >(selectedAddonCategory);

  const updateAddonCategory = () => {
    console.log("updateAddonCategory");
  };

  return (
    <Layout title="Edit Addon Categories">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          defaultValue={selectedAddonCategory?.name}
          onChange={(evt) =>
            setNewAddonCategory({ ...newAddonCategory, name: evt.target.value })
          }
        />
        <FormControlLabel
          sx={{ my: 2 }}
          control={
            <Switch
              checked={newAddonCategory?.is_required ? true : false}
              onChange={(evt) =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  is_required: evt.target.checked,
                })
              }
            />
          }
          label="required"
        />
        <Button
          variant="contained"
          onClick={updateAddonCategory}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditAddonCategories;
