import { Product } from "./product";

export interface Menu {
  id_menu: string;
  name: string;
  price: number;
  description: string;
  menu_image_url: string;
  id_restaurant: string;
  ids_menu_category: Array<string>;
}

export interface FullMenu extends Menu {
  products: Array<Product>;
}
