import DeliveryHistoryCard from "@/components/delivery/deliveryHistoryCard";
import { H1 } from "@/components/typography";
import { createFileRoute } from "@tanstack/react-router";
import DeliveriesEntity from "@/entities/deliveries";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_delivery/deliveries-history")({
  component: DeliveriesHistory,
});

function DeliveriesHistory() {
  const [history, setHistory] = useState(Array<DeliveriesEntity>);

  // TODO: pas garder le useEffect
  useEffect(() => {
    setHistory([
      {
        id_order: Math.random().toString(36).substring(2),
        status: "En cours",
        user_first_name: "John",
        user_last_name: "Doe",
        received_datetime: new Date(""),
        restaurant_to_delivery_datetime: new Date("02/01/2022"),
        price: "12.50",
        order_name: "KFC",
      },
      {
        id_order: Math.random().toString(36).substring(2),
        status: "Terminée",
        user_first_name: "John",
        user_last_name: "Doe",
        received_datetime: new Date("04/01/2022"),
        restaurant_to_delivery_datetime: new Date(""),
        price: "1.50",
        order_name: "McDonalds",
      },
    ]);
  }, []);

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
