import { config } from "@/config/config";
import {
  menus as Menu,
  menus_menu_categories_locations as MenusMenuCategoriesLocations,
  locations as Location,
  addon_categories as AddonCategory,
  menus_addon_categories as MenusAddonCategories,
} from "@prisma/client";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return "";
};

export const getselectedLocationId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedLocationId");
  }
  return "";
};

export const generateLinkForQRCode = (locationId: number, tableId: number) => {
  return `${config.orderApiBaseUrl}?locationId=${locationId}&tableId=${tableId}`;
};

export const getMenusByMenuCategoryId = (
  menus: Menu[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getselectedLocationId() as string;
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menu_id &&
        item.menu_category_id === Number(menuCategoryId) &&
        item.location_id === Number(selectedLocationId)
    )
    .map((item) => item.menu_id);
  return menus.filter((item) => validMenuIds.includes(item.id));
};

export const getLocationsByMenuCategoryId = (
  locations: Location[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const validLocationIds = menusMenuCategoriesLocations
    .filter((item) => item.location_id === Number(menuCategoryId))
    .map((item) => item.menu_id);
  return locations.filter((item) => validLocationIds.includes(item.id));
};

export const getAddonCategoriesByMenuId = (
  addonCategories: AddonCategory[],
  menuId: string,
  menusAddonCategories: MenusAddonCategories[]
) => {
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => item.menu_id === Number(menuId))
    .map((item) => item.addon_category_id);
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );
};

export const getQrCodeUrl = (locationId: number, tableId: number) => {
  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/happy-pos/qrcode/phone_htet_aung/locationId-${locationId}-tableId-${tableId}.png`;
};
