import { Menu } from "./menu";
import { Product } from "./product";

export interface Restaurant {
  address: string;
  banner_url: string;
  business_hours: string;
  city: string;
  email: string;
  food_type: string;
  id_restaurant: string;
  name: string;
  postal_code: string;
  price_range: string;
  rating: number;
}

interface RestaurantCategory {
  id_restaurant_category: string;
  name: string;
  id_restaurant: string;
  Products: Product[];
  Menus: Menu[];
}

interface MergedRestaurantCategory {
  id_restaurant_category: string;
  name: string;
  id_restaurant: string;
  // generated from products and menus
  items: Array<Product | Menu>;
}

export interface FullRestaurant extends Restaurant {
  Restaurant_Categories: Array<RestaurantCategory | MergedRestaurantCategory>;
}

export function mergeRestaurantCategory(
  restaurantCategory: Array<RestaurantCategory>
): Array<MergedRestaurantCategory> {
  return restaurantCategory.map((category) => {
    //we need to merge the categories

    console.log("merge", {
      id_restaurant_category: category.id_restaurant_category,
      name: category.name,
      id_restaurant: category.id_restaurant,
      items: [...category.Products, ...category.Menus].sort(
        //ascending order
        (a, b) => a.name.localeCompare(b.name)
      ),
    });

    return {
      id_restaurant_category: category.id_restaurant_category,
      name: category.name,
      id_restaurant: category.id_restaurant,
      items: [...category.Products, ...category.Menus].sort(
        //ascending order
        (a, b) => a.name.localeCompare(b.name)
      ),
    };
  });
}

export function isMergedRestaurantCategory(
  restaurantCategory: RestaurantCategory | MergedRestaurantCategory
) {
  return (restaurantCategory as MergedRestaurantCategory).items !== undefined;
}
