import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import Link from "next/link";
import { getselectedLocationId } from "@/utils";
import { BackofficeContext } from "@/contexts/BackOfficeContext";
import { config } from "@/config/config";
import Layout from "@/components/Layout";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddonCategories = () => {
  const {
    addonCategories,
    fetchData,
    addons,
    menus,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useContext(BackofficeContext);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getselectedLocationId();
  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
    menuIds: [] as number[],
  });

  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) => item.menu_id && item.location_id === Number(selectedLocationId)
    )
    .map((item) => item.menu_id);
  const validMenus = menus.filter((item) => validMenuIds.includes(item.id));
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menu_id))
    .map((item) => item.addon_category_id);
  const validAddonCategories = addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );

  const getAddonsCount = (addonCategoryId?: number) => {
    if (!addonCategoryId) return 0;
    return addons.filter((item) => item.addon_category_id === addonCategoryId)
      .length;
  };

  const createAddonCategory = async () => {
    const isValid = newAddonCategory.name && newAddonCategory.menuIds.length;
    if (!isValid)
      return alert(
        "Please enter addon category name and select one or more menus"
      );
    await fetch(`${config.backofficeApiBaseUrl}/addonCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddonCategory),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Layout title="Addon Categories">
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#4C4C6D",
              width: "fit-content",
              color: "#E8F6EF",
              mb: 2,
              ":hover": {
                bgcolor: "#1B9C85", // theme.palette.primary.main
                color: "white",
              },
            }}
          >
            New addon category
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {validAddonCategories.map((addonCategory) => (
            <Link
              key={addonCategory.id}
              href={`/backoffice/addonCategories/${addonCategory.id}`}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <Box sx={{ textAlign: "center", mr: 4 }}>
                <Box
                  sx={{
                    width: "170px",
                    height: "170px",
                    borderRadius: 2,
                    border: "2px solid #EBEBEB",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <Typography>
                    {getAddonsCount(addonCategory.id)} addons
                  </Typography>
                </Box>
                <Typography sx={{ mt: 1 }}>{addonCategory.name}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new addon category</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 300,
            minHeight: 150,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{ my: 2 }}
            onChange={(evt) =>
              setNewAddonCategory({
                ...newAddonCategory,
                name: evt.target.value,
              })
            }
          />
          <FormControl>
            <InputLabel id="select-menu-categories">Menus</InputLabel>
            <Select
              label="Menus"
              multiple
              value={newAddonCategory.menuIds}
              onChange={(evt) => {
                const values = evt.target.value as number[];
                setNewAddonCategory({ ...newAddonCategory, menuIds: values });
              }}
              input={<OutlinedInput label="Menus" />}
              renderValue={(values) => {
                const selectedMenus = newAddonCategory.menuIds.map((menuId) => {
                  return validMenus.find((menu) => menu.id === menuId);
                });
                return selectedMenus
                  .map((menu) => menu && menu.name)
                  .join(", ");
              }}
              MenuProps={MenuProps}
            >
              {validMenus.map((menu) => (
                <MenuItem key={menu.id} value={menu.id}>
                  <Checkbox
                    checked={
                      newAddonCategory.menuIds.includes(menu.id) ? true : false
                    }
                  />
                  <ListItemText primary={menu.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Switch
                checked={newAddonCategory.isRequired}
                onChange={(evt) =>
                  setNewAddonCategory({
                    ...newAddonCategory,
                    isRequired: evt.target.checked,
                  })
                }
              />
            }
            label="required"
          />
          <Button
            variant="contained"
            onClick={createAddonCategory}
            sx={{ width: "fit-content", alignSelf: "flex-end", mt: 2 }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AddonCategories;
