import { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { BackofficeContext } from "@/contexts/BackOfficeContext";
import { config } from "@/config/config";
import Layout from "@/components/Layout";
import { getAddonCategoriesByMenuId, getselectedLocationId } from "@/utils";

interface AutocompleteProps {
  id: number;
  label: string;
}

const EditMenu = () => {
  const router = useRouter();
  const menuId = router.query.id as string;
  const {
    menus,
    fetchData,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useContext(BackofficeContext);
  const selectedLocationId = getselectedLocationId() as string;

  const mappedAddonCategories = addonCategories.map((item) => ({
    id: item.id,
    label: item.name,
  }));

  const menu = menus.find((menu) => menu.id === parseInt(menuId, 10));
  const menuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.menu_id === parseInt(menuId, 10))
    .map((item) => item.menu_category_id);

  const [newMenu, setNewMenu] = useState({
    id: menu?.id,
    name: menu?.name,
    price: menu?.price,
    menuCategoryIds,
    locationId: selectedLocationId,
    addonCategoryIds: [] as number[],
  });
  const selectedAddonCategories = getAddonCategoriesByMenuId(
    addonCategories,
    menuId,
    menusAddonCategories
  ).map((item) => ({ id: item.id, label: item.name }));
  const [connectedAddonCategories, setConnectedAddonCategories] =
    useState<AutocompleteProps[]>();

  const updateMenu = async () => {
    await fetch(`${config.backofficeApiBaseUrl}/menus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    fetchData();
  };

  return (
    <Layout title="Edit Menu">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          mt: 5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            defaultValue={menu?.name}
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setNewMenu({ ...newMenu, name: evt.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            type="number"
            defaultValue={menu?.price}
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setNewMenu({ ...newMenu, price: parseInt(evt.target.value, 10) })
            }
          />
          <Autocomplete
            multiple
            disablePortal
            options={mappedAddonCategories}
            value={selectedAddonCategories}
            onChange={(evt, values) => {
              const addonCategoryIds = values.map((item) => item.id);
              setNewMenu({
                ...newMenu,
                addonCategoryIds,
              });
              setConnectedAddonCategories(values);
            }}
            sx={{ mb: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Addon Categories" />
            )}
          />
          <Button
            variant="contained"
            onClick={updateMenu}
            sx={{ width: "fit-content" }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditMenu;
