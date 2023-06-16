// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, isRequired, menuIds } = req.body;
    const isValid = name && menuIds.length;
    if (!isValid) return res.send(400);
    const addonCategory = await prisma.addon_categories.create({
      data: {
        name,
        is_required: isRequired === undefined ? false : isRequired,
      },
    });
    const menusAddonCategories = menuIds.map((menuId: number) => ({
      menus_id: menuId,
      addon_categories_id: addonCategory.id,
    }));
    await prisma.menus_addon_categories.createMany({
      data: menusAddonCategories,
    });
    res.send(200);
  } else if (req.method === "PUT") {
    const { id, name } = req.body;
    res.send(200);
  } else {
    res.send(405);
  }
}
