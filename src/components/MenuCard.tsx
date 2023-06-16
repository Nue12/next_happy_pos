import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { menus as Menu } from "@prisma/client";
import Link from "next/link";

interface Props {
  menu: Menu;
}

const MenuCard = ({ menu }: Props) => {
  return (
    <Link
      key={menu.id}
      href={`/backoffice/menus/${menu.id}`}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "20px",
      }}
    >
      <Card sx={{ width: 300, height: 300 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={menu.asset_url || ""}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {menu.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {menu.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
