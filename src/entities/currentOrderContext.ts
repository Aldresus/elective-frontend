import { CreateOrder, OrderMenu, OrderProduct } from "./order";

export interface CurrentOrderContext extends CreateOrder {
  setRestaurantId: (restaurantId: string) => void;

  addProduct: (product: OrderProduct, quantity: number) => void;
  addMenu: (menu: OrderMenu) => void;

  removeProduct: (product: OrderProduct, quantity: number) => void;
  removeMenu: (menu: OrderMenu) => void;

  clearOrder: () => void;
}
