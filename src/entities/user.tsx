export default interface UserEntity {
  id?: string;
  last_name?: string;
  first_name?: string;
  email?: string;
  postal_code?: string;
  address?: string;
  city?: string;
  created_at?: Date;
  edited_at?: Date;
  birthday?: string;
  phone?: string;
  role?: Role;
  password?: string;
  id_restaurant?: string;
  id_users?: Array<string>;
  notifications?: Array<Notifications>;
}

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export enum Notifications {
  ORDER_CREATED = "order_created",
  ORDER_PAID = "order_paid",
  ORDER_DELIVERED = "order_delivered",
  ORDER_RECEIVED = "order_received",
  ORDER_CANCELLED = "order_cancelled",
  ORDER_FAILED = "order_failed",
}
