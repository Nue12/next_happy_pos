import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { getselectedLocationId } from "@/utils";
import { BackofficeContext } from "@/contexts/BackOfficeContext";
import Layout from "@/components/Layout";
import NewMenu from "./NewMenu";
import MenuCard from "@/components/MenuCard";

const Menus = () => {
  const [open, setOpen] = useState(false);
  const { menusMenuCategoriesLocations, fetchData, menus } =
    useContext(BackofficeContext);
  const selectedLocationId = getselectedLocationId() as string;

  const validMenusIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menu_id && item.location_id === parseInt(selectedLocationId, 10)
    )
    .map((item) => item.menu_id);
  const filteredMenus = menus.filter(
    (menu) => menu.id && validMenusIds.includes(menu.id)
  );

  return (
    <Layout title="Menus">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
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
                bgcolor: "#1B9C85",
                color: "white",
              },
            }}
          >
            New menu
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {filteredMenus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} />
          ))}
        </Box>
      </Box>
      <NewMenu open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Menus;
