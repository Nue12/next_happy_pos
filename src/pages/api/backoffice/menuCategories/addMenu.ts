import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { menuCategoryId, menuId, locationId } = req.body;
    const isValid = menuCategoryId && menuId && locationId;
    if (!isValid) return res.send(400);
    await prisma.menus_menu_categories_locations.create({
      data: {
        menu_id: menuId,
        menu_category_id: Number(menuCategoryId),
        location_id: Number(locationId),
      },
    });
    return res.send(200);
  }
  return res.send(405);
}
