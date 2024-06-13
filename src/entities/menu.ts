import type { Product } from "./product";

export interface Menu {
  id_menu: string;
  name: string;
  description: string;
  menu_image_url: string;
  price: number;
  category: string;
  menu_ordered_categories: string;
  products: Product[];
}
