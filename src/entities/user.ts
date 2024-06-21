export interface User {
  id?: string;
  last_name?: string;
  first_name?: string;
  email?: string;
  created_at?: Date;
  edited_at?: Date;
  birthday?: string;
  phone?: string;
  role?: RoleEnum;
  password?: string;
  id_restaurant?: string;
  id_users?: Array<string>;
  notifications?: Array<NotificationsEnum>;
}

export interface UpdateRoleUser {
  id_user?: string;
  role?: RoleEnum.CLIENT | RoleEnum.RESTAURATEUR | RoleEnum.DELIVERYMAN;
}

export interface UpdateUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export enum RoleEnum {
  COMMERCIAL = "COMMERCIAL",
  ADMIN = "ADMIN",
  RESTAURATEUR = "RESTAURATEUR",
  DELIVERYMAN = "DELIVERYMAN",
  TECHNICIAN = "TECHNICIAN",
  CLIENT = "CLIENT",
  DEV = "DEV",
}

export enum NotificationsEnum {
  ORDER_CREATED = "order_created",
  ORDER_PAID = "order_paid",
  ORDER_DELIVERED = "order_delivered",
  ORDER_RECEIVED = "order_received",
  ORDER_CANCELLED = "order_cancelled",
  ORDER_FAILED = "order_failed",
}
