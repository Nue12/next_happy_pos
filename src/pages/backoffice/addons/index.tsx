import {
  Box,
  Button,
  Checkbox,
  Chip,
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
import { useRouter } from "next/router";
import Link from "next/link";
import { getAccessToken, getselectedLocationId } from "@/utils";
import { BackofficeContext } from "@/contexts/BackOfficeContext";
import {
  menu_categories as MenuCategory,
  locations as Location,
  menus as Menu,
} from "@prisma/client";
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

const Addons = () => {
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
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.location_id === Number(selectedLocationId))
    .map((item) => item.menu_id);
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.addon_category_id))
    .map((item) => item.addon_category_id);
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_category_id)
  );

  const createAddon = async () => {
    const isValid = newAddon.name && newAddon.addonCategoryId;
    if (!isValid)
      return alert("Please enter addon name and select one addon category");
    await fetch(`${config.backofficeApiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddon),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Layout title="Addons">
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
            New addon
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {validAddons.map((addon) => (
            <Link
              key={addon.id}
              href={`/backoffice/addons/${addon.id}`}
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
                ></Box>
                <Typography sx={{ mt: 1 }}>{addon.name}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new addon</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 300,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mt: 1 }}
            onChange={(evt) =>
              setNewAddon({
                ...newAddon,
                name: evt.target.value,
              })
            }
          />
          <TextField
            label="Price"
            variant="outlined"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{ my: 2 }}
            onChange={(evt) =>
              setNewAddon({
                ...newAddon,
                price: Number(evt.target.value),
              })
            }
          />
          <FormControl fullWidth>
            <InputLabel>Addon Category</InputLabel>
            <Select
              value={newAddon.addonCategoryId}
              label="Addon Category"
              onChange={(evt) =>
                setNewAddon({ ...newAddon, addonCategoryId: evt.target.value })
              }
            >
              {addonCategories.map((item) => {
                return (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={createAddon}
            sx={{ width: "fit-content", alignSelf: "flex-end", mt: 2 }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Addons;
