import { CreateOrder, OrderMenu, OrderProduct } from "./order";

export interface CurrentOrderContext extends CreateOrder {
  setRestaurantId: (restaurantId: string) => void;
  setUserId: (userId: string) => void;

  addProduct: (product: OrderProduct, quantity: number) => void;
  addMenu: (menu: OrderMenu) => void;

  removeProduct: (product: OrderProduct) => void;
  removeMenu: (menu: OrderMenu) => void;

  clearOrder: () => void;

  setAddress: (address: {
    address: string;
    city: string;
    postal_code: string;
  }) => void;

  calculateTotalPrice: () => number;
}
