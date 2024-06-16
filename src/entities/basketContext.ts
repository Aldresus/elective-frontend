import { FullMenu } from "./menu";
import { CreateOrder } from "./order";
import { Product } from "./product";

export interface BasketContext extends CreateOrder {
  setRestaurantId: (restaurantId: string) => void;

  addProduct: (product: Product, quantity: number) => void;
  addMenu: (menu: FullMenu) => void;

  removeProduct: (product: Product, quantity: number) => void;
  removeMenu: (menu: FullMenu) => void;

  clearBasket: () => void;
}
