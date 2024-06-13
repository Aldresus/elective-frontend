import Map from "@/components/common/map";
import DeliveryChoice from "@/components/delivery/deliveryChoice";
import { H1, H2 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import DeliveriesEntity from "@/entities/deliveries";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_delivery/deliveries")({
  component: Deliveries,
});

function Deliveries() {
  const [deliveries, setDeliveries] = useState<Array<DeliveriesEntity>>([]);

  // TODO: pas garder le useEffect
  useEffect(() => {
    setDeliveries([
      {
        id_order: Math.random().toString(36).substring(2),
        order_name: "KFC",
        user_address: "123 rue de la boite",
        user_city: "Lingolsheim",
        user_postal_code: "67200",
        price: "100",
      },
      {
        id_order: Math.random().toString(36).substring(2),
        order_name: "McDonalds",
        user_address: "123 rue de la boite",
        user_city: "Strasbourg",
        user_postal_code: "67000",
        price: "12.50",
      },
      {
        id_order: Math.random().toString(36).substring(2),
        order_name: "Burger King",
        user_address: "12 rue de la boite",
        user_city: "Strasbourg",
        user_postal_code: "67000",
        price: "1.50",
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col mx-auto h-full pb-0 gap-2">
      <div className="flex flex-col justify-center min-h-[40vh] w-full">
        <H1 className="mb-2">Choix livraison</H1>
        <Map x={48.560679} y={7.694228} />
      </div>
      <Separator className="w-full" />
      <div className="h-full overflow-hidden">
        <H2>Choix d'une livraison</H2>
        <div className="h-full space-y-4 pb-32 overflow-auto">
          {deliveries.map((delivery) => (
            <DeliveryChoice key={delivery.id_order} {...delivery} />
          ))}
        </div>
      </div>
    </div>
  );
}
