import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import Link from "next/link";
import { getselectedLocationId } from "@/utils";
import { BackofficeContext } from "@/contexts/BackOfficeContext";

import { config } from "@/config/config";
import Layout from "@/components/Layout";
import NewMenuCategory from "./NewMenuCategory";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MenuCategories = () => {
  const { menuCategories, fetchData, menusMenuCategoriesLocations } =
    useContext(BackofficeContext);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getselectedLocationId() as string;

  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.location_id === parseInt(selectedLocationId, 10))
    .map((item) => item.menu_category_id);

  const filteredMenuCategories = menuCategories.filter(
    (item) => item.id && validMenuCategoryIds.includes(item.id)
  );

  const getMenusCount = (menuCategoryId?: number) => {
    if (!menuCategoryId) return 0;
    return menusMenuCategoriesLocations.filter(
      (item) =>
        item.menu_category_id === menuCategoryId &&
        item.menu_id &&
        item.location_id === Number(selectedLocationId)
    ).length;
  };

  const deleteMenuCategory = async (menuCategoryId: number) => {
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/menuCategories/${menuCategoryId}`,
      {
        method: "DELETE",
      }
    );
    fetchData();
  };

  const getRandomColor = () => {
    const colors = [
      "#CFDDDB",
      "#E4CDED",
      "#C2DBE8",
      "#C9CAEF",
      "#FAC1D9",
      "#E5D9DE",
      "#F0C8D0",
      "#C2E9DC",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Layout title="Menu Categories">
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
            New menu category
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {filteredMenuCategories.map((menuCategory) => (
            <Link
              key={menuCategory.id}
              href={`/backoffice/menuCategories/${menuCategory.id}`}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <Paper
                elevation={2}
                sx={{
                  width: 170,
                  height: 170,
                  mr: 4,
                  mb: 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  pl: 2,
                  pb: 2,
                }}
              >
                <Typography sx={{ color: "#4C4C6D", fontWeight: "700" }}>
                  {menuCategory.name}
                </Typography>
                <Typography sx={{ color: "#4C4C6D", fontSize: 14 }}>
                  {getMenusCount(menuCategory.id)} menus
                </Typography>
              </Paper>
            </Link>
          ))}
        </Box>
      </Box>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default MenuCategories;
