import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    const isValid = name && addonCategoryId;
    if (!isValid) return res.send(400);
    await prisma.addons.create({
      data: { name, price, addon_category_id: addonCategoryId },
    });
    return res.send(200);
  }
  res.send(405);
}
