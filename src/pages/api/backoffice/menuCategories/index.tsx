// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      name,
      price,
      locationIds,
      menuCategoryIds,
      assetUrl = "",
      description = "",
    } = req.body;
    const isValid =
      name && price && locationIds.length && menuCategoryIds.length;
    if (!isValid) return res.send(400);
    const menu = await prisma.menus.create({
      data: {
        name: name,
        price: price,
        asset_url: assetUrl,
        description,
      },
    });
    const menuId = menu.id;
    if (menuCategoryIds.length > 1) {
      const data = menuCategoryIds.map((menuCategoryId: number) => ({
        menus_id: menuId,
        locations_id: locationIds[0],
        menu_categories_id: menuCategoryId,
      }));
      await prisma.menus_menu_categories_locations.createMany({
        data,
      });
    } else {
      await prisma.menus_menu_categories_locations.create({
        data: {
          menu_id: menuId,
          location_id: locationIds[0],
          menu_category_id: menuCategoryIds[0],
        },
      });
    }
    res.send(200);
  } else if (req.method === "PUT") {
    const { id, name, price, locationId, menuCategoryIds } = req.body;
    await prisma.menus.update({
      data: {
        name,
        price,
      },
      where: {
        id,
      },
    });
    if (menuCategoryIds.length) {
      await prisma.menus_menu_categories_locations.deleteMany({
        where: { menu_id: id },
      });
      const data = menuCategoryIds.map((menuCategoryId: number) => ({
        menu_id: id,
        menu_category_id: menuCategoryId,
        location_id: parseInt(locationId, 10),
      }));
      await prisma.menus_menu_categories_locations.createMany({ data: data });
    }
    res.send(200);
  } else {
    res.send(405);
  }
}
