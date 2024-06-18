import DeliveryHistoryCard from "@/components/delivery/deliveryHistoryCard";
import { H1 } from "@/components/typography";
import OrderEntity from "@/entities/order";
import { User } from "@/entities/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_delivery/deliveries-history")({
  component: DeliveriesHistory,
});

interface IDeliveries extends OrderEntity, User {
  id_order?: string;
  price?: string;
  status?: string;
  order_name?: string;
  user_first_name?: string;
  user_last_name?: string;
  received_datetime?: Date;
  restaurant_to_delivery_datetime?: Date;
}

function DeliveriesHistory() {
  const userData: Array<User> = [
    {
      first_name: "Client1",
      last_name: "kks",
    },
    {
      first_name: "Client2",
      last_name: "kks",
    },
  ];

  const orderData: Array<OrderEntity> = [
    {
      id_order: Math.random().toString(36).substring(2),
      price: "2",
      status: "Terminée",
      received_datetime: new Date(-1),
      restaurant_to_delivery_datetime: new Date(-1),
    },
    {
      id_order: Math.random().toString(36).substring(2),
      price: "29",
      status: "en cours",
      received_datetime: new Date("02/01/2022"),
      restaurant_to_delivery_datetime: new Date("02/01/2022"),
    },
  ];

  const history: Array<IDeliveries> = orderData.map(
    (order: OrderEntity, index: number) => ({
      id_order: order.id_order,
      status: order.status,
      price: order.price,
      order_name: "le nom",
      user_first_name: userData[index].first_name,
      user_last_name: userData[index].last_name,
      received_datetime: order.received_datetime,
      restaurant_to_delivery_datetime: order.restaurant_to_delivery_datetime,
    })
  );

  return (
    <div className="p-0 h-full pb-20">
      <H1 className="mb-2">Historique des livraisons</H1>
      <div className="h-full flex flex-col space-y-2 overflow-auto pb-20">
        {history.map((delivery) => (
          <DeliveryHistoryCard key={delivery.id_order} {...delivery} />
        ))}
      </div>
    </div>
  );
}
