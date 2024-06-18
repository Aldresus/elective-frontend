export default interface RestaurantEntity {
  id_restaurant: string;
  name?: string;
  siret?: string;
  email: string;
  food_type?: string;
  price_range?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  rating?: number;
  banner_url?: string;
  business_hours?: string;
  createdAt: Date;
  updatedAt: Date;
}
