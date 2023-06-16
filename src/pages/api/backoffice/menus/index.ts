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
    const { id, name, price, locationId, addonCategoryIds } = req.body;
    await prisma.menus.update({
      data: {
        name,
        price,
      },
      where: {
        id,
      },
    });
    if (addonCategoryIds.length) {
      const menusAddonCategories = await prisma.menus_addon_categories.findMany(
        { where: { menu_id: id } }
      );
      const existingAddonCategoryIds = menusAddonCategories.map(
        (item) => item.addon_category_id
      ) as number[];
      const addedAddonCategoryIds = addonCategoryIds.filter(
        (item: number) => !existingAddonCategoryIds.includes(item)
      );
      const removedAddonCategoryIds = existingAddonCategoryIds.filter(
        (item: number) => !addonCategoryIds.includes(item)
      );
      if (removedAddonCategoryIds.length) {
        await prisma.menus_addon_categories.deleteMany({
          where: {
            menu_id: id,
            addon_category_id: { in: removedAddonCategoryIds },
          },
        });
      }
      if (addedAddonCategoryIds.length) {
        const newMenusAddonCategories = addedAddonCategoryIds.map(
          (item: number) => ({ menu_id: id, addon_category_id: item })
        );
        await prisma.menus_addon_categories.createMany({
          data: newMenusAddonCategories,
        });
      }
    }
    res.send(200);
  } else {
    res.send(405);
  }
}
