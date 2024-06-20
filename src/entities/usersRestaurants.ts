import { Restaurant } from "./restaurant";

export interface UsersRestaurants {
  id_user_restaurant: string;
  id_restaurant: string;
  id_user: string;
  restaurant: Restaurant;
}
