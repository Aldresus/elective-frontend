import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";

export const itemsData: Array<Menu | Product> = [
  {
    id_product: "667051e44258d9eaef63dd8c",
    name: "Classic Burger",
    price: 8,
    description: "Juicy beef patty with lettuce, tomato, and cheese",
    product_image_url: "https://picsum.photos/200",
    id_restaurant: "667051e44258d9eaef63dd8b",
    ids_menu_category: ["667051e44258d9eaef63dd94"],
  },
  {
    id_product: "667051e44258d9eaef63dd8d",
    name: "BBQ Burger",
    price: 9.5,
    description: "Beef patty with BBQ sauce, onion rings, and cheddar cheese",
    product_image_url: "https://picsum.photos/200",
    id_restaurant: "667051e44258d9eaef63dd8b",
    ids_menu_category: ["667051e44258d9eaef63dd94"],
  },
  {
    id_product: "667051e44258d9eaef63dd8e",
    name: "Veggie Burger",
    price: 7.5,
    description: "Plant-based patty with avocado, lettuce, and tomato",
    product_image_url: "https://picsum.photos/200",

    id_restaurant: "667051e44258d9eaef63dd8b",
    ids_menu_category: ["667051e44258d9eaef63dd94"],
  },
  {
    id_product: "667051e44258d9eaef63dd8f",
    name: "French Fries",
    price: 3,
    description: "Crispy golden fries",
    product_image_url: "https://picsum.photos/200",
    id_restaurant: "667051e44258d9eaef63dd8b",
    ids_menu_category: ["667051e44258d9eaef63dd95"],
  },
  {
    id_product: "66712c58568c4946317e52ab",
    name: "Onion Rings",
    price: 4,
    description: "Breaded and fried onion rings",
    product_image_url: "https://picsum.photos/200",
    id_restaurant: "667051e44258d9eaef63dd8b",
    ids_menu_category: [],
  },
  {
    id_product: "667051e44258d9eaef63dd91",
    name: "Cola",
    price: 2,
    description: "Refreshing cola drink",
    product_image_url: "https://picsum.photos/200",
    id_restaurant: "667051e44258d9eaef63dd8b",
    ids_menu_category: ["667051e54258d9eaef63dd96"],
  },
  {
    id_product: "667051e44258d9eaef63dd92",
    name: "Lemonade",
    price: 2.5,
    description: "Freshly squeezed lemonade",
    product_image_url: "https://picsum.photos/200",
    id_restaurant: "667051e44258d9eaef63dd8b",
    ids_menu_category: ["667051e54258d9eaef63dd96"],
  },
];
