import type { Menu } from "./menu";
import type { Product } from "./product";

export interface CategoryContent {
  category_name: string;
  category_id: string;
  items: Array<Menu | Product>;
}

export function isProduct(item: Product | Menu): item is Product {
  return (item as Product).id_product !== undefined;
}

export function isMenu(item: Product | Menu): item is Menu {
  return (item as Menu).id_menu !== undefined;
}

export function getItemId(item: Product | Menu): string {
  if (isProduct(item)) {
    return item.id_product
  } else {
    return item .id_menu
  };
}