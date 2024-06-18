import type { Menu } from "./menu";
import type { Product } from "./product";

export interface CreateCategoryContent {
  id_category?: string;
  name: string;
  ids_menu : Array<string>;
  ids_product : Array<string>;
  Product?: Array<Product>;
}

export interface CategoryContent extends CreateCategoryContent{
  id_category: string;
  Product: Array<Product>;
}

export function isProduct(item: Product | Menu): item is Product {
  return (item as Product).id_product !== undefined;
}

export function isMenu(item: Product | Menu): item is Menu {
  return (item as Menu).id_menu !== undefined;
}


// Get id of the item   Warning : do not use when you need another type specific attribute
export function getItemId(item: Product | Menu): string {
  if (isProduct(item)) {
    return item.id_product
  } else {
    return item .id_menu
  };
}
