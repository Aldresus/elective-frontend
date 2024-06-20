import { RestaurateurContext } from "@/entities/restaurateurContext";
import { createContext } from "react";

export const restaurateurContext = createContext<RestaurateurContext>({
  restaurant: {
    address: "",
    city: "",
    banner_url: "",
    business_hours: "",
    id_restaurant: "",
    email: "",
    name: "",
    food_type: "",
    postal_code: "",
    price_range: "",
    rating: 0,
  },
});
