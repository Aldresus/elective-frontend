export interface Product extends EditProduct {
  id_product: string;
  id_restaurant: string;
  ids_menu_category: Array<string>;
}

export interface EditProduct {
  name: string;
  price: number;
  description: string;
  product_image_url: string;
}
