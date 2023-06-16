import { Order } from "../typings/types";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  menus as Menu,
  menu_categories as MenuCategory,
  addons as Addon,
  addon_categories as AddonCategory,
  locations as Location,
} from "@prisma/client";

interface OrderContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  updateData: (value: any) => void;
  fetchData: () => void;
  isLoading: boolean;
  cart: Order[];
}

export const defaultOrderContext: OrderContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  updateData: () => {},
  fetchData: () => {},
  isLoading: false,
  cart: [],
};

export const OrderContext =
  createContext<OrderContextType>(defaultOrderContext);

const OrderProvider = (props: any) => {
  const [data, updateData] = useState(defaultOrderContext);
  const { data: session } = useSession();

  const fetchData = async () => {
    updateData({ ...data, isLoading: true });
    // const response = await fetch(`${config.orderApiBaseUrl}?locationId=3`);
    // const responseJson = await response.json();

    // const { menus, menuCategories, addons, addonCategories, locations } =
    //   responseJson;
    // updateData({
    //   ...data,
    //   menus: menus,
    //   menuCategories,
    //   addons,
    //   addonCategories,
    //   locations,
    //   isLoading: false,
    // });
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <OrderContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
