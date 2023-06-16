// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import type { menus as Menu } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.send(401);
  const user = session.user;
  const email = user?.email as string;
  const name = user?.name as string;
  const userFromDB = await prisma.users.findFirst({ where: { email } });
  if (!userFromDB) {
    const newCompany = await prisma.companies.create({
      data: {
        name: "Default companies",
      },
    });
    await prisma.users.create({
      data: {
        name,
        email,
        password: "",
        company_id: newCompany.id,
        role: "admin",
      },
    });
    const newLocation = await prisma.locations.create({
      data: {
        name: "Default location",
        address: "Default address",
        company_id: newCompany.id,
      },
    });
    const newMenusData = [
      { name: "mote-hinn-kharr", price: 500 },
      { name: "shan-khout-swell", price: 1500 },
    ];
    const newMenus = await prisma.$transaction(
      newMenusData.map((menu) => prisma.menus.create({ data: menu }))
    );
    const newMenuCategoriesData = [
      { name: "Default category 1" },
      { name: "Default category 2" },
    ];
    const newMenuCategories = await prisma.$transaction(
      newMenuCategoriesData.map((menuCategory) =>
        prisma.menu_categories.create({ data: menuCategory })
      )
    );
    const newMenusMenuCategoriesLocationsData = [
      {
        menu_id: newMenus[0].id,
        menu_category_id: newMenuCategories[0].id,
        location_id: newLocation.id,
      },
      {
        menu_id: newMenus[1].id,
        menu_category_id: newMenuCategories[1].id,
        location_id: newLocation.id,
      },
    ];
    const newMenusMenuCategoriesLocations = await prisma.$transaction(
      newMenusMenuCategoriesLocationsData.map(
        (newMenusMenuCategoriesLocations) =>
          prisma.menus_menu_categories_locations.create({
            data: newMenusMenuCategoriesLocations,
          })
      )
    );
    const newAddonCategoriesData = [{ name: "Drinks" }, { name: "Sizes" }];
    const newAddonCategories = await prisma.$transaction(
      newAddonCategoriesData.map((addonCategory) =>
        prisma.addon_categories.create({ data: addonCategory })
      )
    );
    await prisma.menus_addon_categories.createMany({
      data: [
        {
          menu_id: newMenus[0].id,
          addon_category_id: newAddonCategories[0].id,
        },
        {
          menu_id: newMenus[1].id,
          addon_category_id: newAddonCategories[1].id,
        },
      ],
    });
    const newAddonsData = [
      {
        name: "Cola",
        price: 500,
        addon_category_id: newAddonCategories[0].id,
      },
      {
        name: "Pepsi",
        price: 500,
        addon_category_id: newAddonCategories[0].id,
      },
      {
        name: "Large",
        price: 200,
        addon_category_id: newAddonCategories[1].id,
      },
      {
        name: "Normal",
        price: 0,
        addon_category_id: newAddonCategories[1].id,
      },
    ];
    const newAddons = await prisma.$transaction(
      newAddonsData.map((addon) => prisma.addons.create({ data: addon }))
    );
    return res.send({
      menus: newMenus,
      menuCategories: newMenuCategories,
      addons: newAddons,
      addonCategories: newAddonCategories,
      locations: newLocation,
      menusMenuCategoriesLocation: newMenusMenuCategoriesLocations,
      company: newCompany,
    });
  } else {
    const companyId = userFromDB.company_id as number;
    const locations = await prisma.locations.findMany({
      where: {
        company_id: companyId,
      },
    });
    const locationIds = locations.map((location) => location.id);
    const menusMenuCategoriesLocations =
      await prisma.menus_menu_categories_locations.findMany({
        where: {
          location_id: {
            in: locationIds,
          },
        },
      });
    const menuCategoryIds = menusMenuCategoriesLocations.map(
      (item) => item.menu_category_id
    );
    const menuIds = menusMenuCategoriesLocations
      .map((item) => item.menu_id)
      .filter((item) => item !== null) as number[];
    const menuCategories = await prisma.menu_categories.findMany({
      where: {
        id: {
          in: menuCategoryIds,
        },
      },
    });

    const menus = await prisma.menus.findMany({
      where: {
        id: {
          in: menuIds,
        },
      },
    });
    const menusAddonCategories = await prisma.menus_addon_categories.findMany({
      where: {
        menu_id: {
          in: menuIds,
        },
      },
    });

    const addonCategoryIds = menusAddonCategories.map(
      (menuAddonCategoryId) => menuAddonCategoryId.addon_category_id
    ) as number[];
    const addonCategories = await prisma.addon_categories.findMany({
      where: {
        id: {
          in: addonCategoryIds,
        },
      },
    });
    const addons = await prisma.addons.findMany({
      where: {
        addon_category_id: {
          in: addonCategoryIds,
        },
      },
    });
    const tables = await prisma.tables.findMany({
      where: {
        location_id: {
          in: locationIds,
        },
      },
    });
    const company = await prisma.companies.findFirst({
      where: {
        id: companyId,
      },
    });
    res.send({
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      company,
      tables,
    });
  }
}
