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

export interface CreateCategoryContentRestaurant extends CreateCategoryContent {
  id_restaurant_category?: string;
  id_restaurant: string;
  name: string;
  ids_menu : Array<string>;
  ids_product : Array<string>;
  Products?: Array<Product>;
  Menus?: Array<Menu>;
}

export interface CategoryContentRestaurant extends CreateCategoryContentRestaurant {
  id_restaurant_category: string;
  Products: Array<Product>;
  Menus: Array<Menu>;
}

export function isCategoryContent(category: CategoryContent | CategoryContentRestaurant): category is CategoryContent {
  return (category as CategoryContent).id_category !== undefined;
};

export function isCategoryContentRestaurant(category: CategoryContent | CategoryContentRestaurant): category is CategoryContentRestaurant {
  return (category as CategoryContentRestaurant).id_restaurant_category !== undefined;
};

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
    return item.id_menu
  };
}
