import { getQrCodeUrl } from "@/utils";
import { prisma } from "@/utils/db";
import { qrCodeImageUpload } from "@/utils/fileUpload";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.send(400);
    const table = await prisma.tables.create({
      data: { name, location_id: Number(locationId) },
    });
    await qrCodeImageUpload(locationId, table.id);
    const qrCodeUrl = getQrCodeUrl(Number(locationId), table.id);
    await prisma.tables.update({
      data: { asset_url: qrCodeUrl },
      where: { id: table.id },
    });
    return res.send(200);
  } else if (method === "PUT") {
    const { tableId, name } = req.body;
    const isValid = tableId && name;
    if (!isValid) return res.send(400);
    await prisma.tables.update({
      data: { name },
      where: { id: Number(tableId) },
    });
    return res.send(200);
  }
  res.send(405);
}
