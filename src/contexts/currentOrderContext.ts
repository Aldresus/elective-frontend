import { CurrentOrderContext } from "@/entities/currentOrderContext";
import { createContext } from "react";

export const currentOrderContext = createContext<CurrentOrderContext>({
  address: "",
  city: "",
  id_restaurant: "",
  id_user: "",
  notes: "",
  postal_code: "",
  price: 0,
  order_date: new Date(),
  restaurant_accepted_datetime: undefined,
  restaurant_to_delivery_datetime: undefined,
  received_datetime: new Date(),
  delivery_accepted_datetime: undefined,
  id_order: undefined,

  menus: [],
  products: [],

  setRestaurantId: () => {},
  setUserId: () => {},

  addProduct: () => {},
  addMenu: () => {},

  removeProduct: () => {},
  removeMenu: () => {},

  clearOrder: () => {},

  setAddress: () => {},

  calculateTotalPrice: () => 0,
});
