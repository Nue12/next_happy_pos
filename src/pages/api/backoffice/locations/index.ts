// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;
    const { name, address, companyId } = data;
    const isValid = name && address;
    if (!isValid) return res.send(400);
    await prisma.locations.create({
      data: { name, address, company_id: companyId },
    });
    res.send(200);
  } else if (req.method === "PUT") {
    const { id, name, address } = req.body;
    const isValid = id && name && address;
    if (!isValid) return res.send(400);
    await prisma.locations.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        address,
      },
    });
    res.send(200);
  } else {
    res.send(405);
  }
}
