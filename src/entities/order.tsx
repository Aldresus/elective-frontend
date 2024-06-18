export default interface OrderEntity {
  id_order?: string;
  order_date?: Date;
  status?: string;
  price?: string;
  postal_code?: string;
  address?: string;
  city?: string;
  notes?: string;
  restaurant_to_delivery_datetime?: Date;
  received_datetime?: Date;
  restaurant_accepted_datetime?: Date;
  delivery_accepted_datetime?: Date;
  id_restaurant?: string;
  id_user?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
