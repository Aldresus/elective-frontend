export interface Product {
  id_product: string;
  name: string;
  price: number;
  description: string;
  product_image_url: string;
  id_restaurant: string;
  ids_menu_category: Array<string>
}

