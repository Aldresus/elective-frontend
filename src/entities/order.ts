import { OrderStatusEnum } from "@/enums/orderStatus";
import { Product } from "./product";

export interface OrderMenu {
  // not to mix with Menu (only a partial for orders)
  id_menu: string;
  name: string;
  description: string;
  price: number;
  products: Array<OrderProduct>;
}

export interface OrderProduct {
  // not to mix with Product (only a partial for orders)
  id_product: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface CreateOrder {
  id_order?: string;
  order_date: Date;
  price: number;
  postal_code: string;
  address: string;
  city: string;
  notes: string;
  restaurant_to_delivery_datetime?: Date;
  received_datetime?: Date;
  restaurant_accepted_datetime?: Date;
  delivery_accepted_datetime?: Date;
  id_user: string;
  id_restaurant: string;

  menus: Array<OrderMenu>;
  products: Array<OrderProduct>;
}

export interface Order extends CreateOrder {
  id_order: string;
  status: OrderStatusEnum;
}

export function productToOrderProduct(product: Product): OrderProduct {
  return {
    id_product: product.id_product,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: 1,
  };
}
