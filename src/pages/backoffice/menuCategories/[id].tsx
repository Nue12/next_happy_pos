import Layout from "@/components/Layout";
import { config } from "@/config/config";
import { BackofficeContext } from "@/contexts/BackOfficeContext";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { menus as Menu } from "@prisma/client";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  getAccessToken,
  getLocationsByMenuCategoryId,
  getMenusByMenuCategoryId,
  getselectedLocationId,
} from "@/utils";
import MenuCard from "@/components/MenuCard";
import RemoveMenuFromMenuCategory from "./RemoveMenuFromMenuCategory";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface AutocompleteProps {
  id: number;
  label: string;
}

const EditMenuCategory = () => {
  const router = useRouter();
  const {
    locations,
    menus,
    menusMenuCategoriesLocations,
    fetchData,
    menuCategories,
  } = useContext(BackofficeContext);
  const menuCategoryId = router.query.id as string;
  const selectedLocationId = getselectedLocationId();
  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );
  const [open, setOpen] = useState(false);
  const [selectedMenuToRemove, setSelectedMenuToRemove] = useState<Menu>();
  const validMenus = getMenusByMenuCategoryId(
    menus,
    menuCategoryId,
    menusMenuCategoriesLocations
  );
  const validMenuIds = validMenus.map((item) => item.id);
  const selectedLocations = getLocationsByMenuCategoryId(
    locations,
    menuCategoryId,
    menusMenuCategoriesLocations
  );
  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: menuCategory?.name,
    locations: selectedLocations,
  });
  const [selectedMenu, setSelectedMenu] = useState<AutocompleteProps | null>(
    null
  );

  const updateMenuCategory = async () => {
    await fetch(`${config.backofficeApiBaseUrl}/menuCategories`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
    fetchData();
  };

  const addMenuToMenuCategory = async () => {
    await fetch(`${config.backofficeApiBaseUrl}/menuCategories/addMenu`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuCategoryId,
        menuId: selectedMenu && selectedMenu.id,
        locationId: selectedLocationId,
      }),
    });
    fetchData();
    setSelectedMenu(null);
  };

  const handleRemoveMenu = async (menu: Menu) => {
    await fetch(`${config.backofficeApiBaseUrl}/menuCategories/removeMenu`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuCategoryId,
        menuId: menu.id,
        locationId: selectedLocationId,
      }),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Layout title="Edit Menu Category">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          defaultValue={menuCategory?.name}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
        />
        <Autocomplete
          multiple
          options={locations}
          value={selectedLocations}
          disableCloseOnSelect
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          onChange={(evt, values) => {
            setNewMenuCategory({ ...newMenuCategory, locations: values });
          }}
          renderOption={(props, option) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={
                  newMenuCategory.locations.find(
                    (location) => location.id === option.id
                  )
                    ? true
                    : false
                }
              />
              {option.name}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
        <Button
          variant="contained"
          onClick={updateMenuCategory}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Menus
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Autocomplete
            sx={{ minWidth: 300, mr: 3 }}
            value={selectedMenu}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(evt, value) => {
              setSelectedMenu(value);
            }}
            clearOnBlur
            options={menus
              .filter((item) => !validMenuIds.includes(item.id))
              .map((item) => ({ id: item.id, label: item.name }))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add menu to this category"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <Button variant="contained" onClick={addMenuToMenuCategory}>
            Add
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validMenus.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <MenuCard menu={item} />
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ width: "fit-content" }}
                onClick={() => {
                  setSelectedMenuToRemove(item);
                  setOpen(true);
                }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      <RemoveMenuFromMenuCategory
        menu={selectedMenuToRemove}
        open={open}
        setOpen={setOpen}
        handleRemoveMenu={handleRemoveMenu}
      />
    </Layout>
  );
};

export default EditMenuCategory;
