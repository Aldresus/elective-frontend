export default interface DeliveriesEntity {
  id_order: string;
  price?: string;
  status?: string;
  order_name?: string; // TODO: nom de la commande, n'existe pas dans l'entité order
  user_last_name?: string; // TODO: nom du client, relation avec user
  user_first_name?: string; // TODO: nom du client, relation avec user
  user_address?: string; // TODO: adresse du client, relation avec user
  user_city?: string; // TODO: ville du client, relation avec user
  user_postal_code?: string; // TODO: code postal du client, relation avec user
  restaurant_name?: string; // TODO: nom du restaurant, relation avec restaurant
  restaurant_address?: string; // TODO: adresse du restaurant, relation avec restaurant
  restaurant_city?: string; // TODO: ville du restaurant, relation avec restaurant
  restaurant_postal_code?: string; // TODO: code postal du restaurant, relation avec restaurant
  received_datetime?: Date; // TODO: date de réception, relation avec order
  restaurant_to_delivery_datetime?: Date; // TODO: date de livraison, relation avec order
}
