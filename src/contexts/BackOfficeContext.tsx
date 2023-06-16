import { config } from "../config/config";
import {
  addons as Addon,
  addon_categories as AddonCategory,
  companies as Company,
  locations as Location,
  menus as Menu,
  menu_categories as MenuCategory,
  menus_menu_categories_locations as MenusMenuCategoriesLocations,
  menus_addon_categories as MenusAddonCategories,
  tables as Table,
} from "@prisma/client";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface BackOfficeContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  menusAddonCategories: MenusAddonCategories[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[];
  tables: Table[];
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: () => void;
  isLoading: boolean;
}

export const defaultBackOfficeContext: BackOfficeContextType = {
  menus: [],
  menuCategories: [],
  menusAddonCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menusMenuCategoriesLocations: [],
  tables: [],
  company: null,
  updateData: () => {},
  fetchData: () => {},
  isLoading: true,
};

export const BackofficeContext = createContext<BackOfficeContextType>(
  defaultBackOfficeContext
);

const BackofficeProvider = (props: any) => {
  const [data, updateData] = useState(defaultBackOfficeContext);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    const response = await fetch(`${config.backofficeApiBaseUrl}`);
    const responseJson = await response.json();

    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      company,
      tables,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      company,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      tables,
      isLoading: false,
    });
  };

  return (
    <BackofficeContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </BackofficeContext.Provider>
  );
};

export default BackofficeProvider;
