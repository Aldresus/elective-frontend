import Map from "@/components/common/map";
import { DeliveryChoice } from "@/components/delivery/deliveryChoice";
import { H1, H2 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/entities/order";
import { User } from "@/entities/user";
import { OrderStatusEnum } from "@/enums/orderStatus";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_delivery/deliveries")({
  component: Deliveries,
});

function Deliveries() {
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
          <DeliveryChoice
            order={{
              address: "Rue de la Paix",
              city: "Paris",
              postal_code: "75001",
              price: 10,
              status: OrderStatusEnum.DELIVERED,
              id_order: "1",
              id_user: "1",
              id_restaurant: "1",
              menus: [],
              notes: "",
              order_date: new Date(),
              products: [],
              delivery_accepted_datetime: new Date(),
              received_datetime: new Date(),
              restaurant_accepted_datetime: new Date(),
              restaurant_to_delivery_datetime: new Date(),
            }}
            user={{
              id: "1",
              first_name: "John",
              last_name: "Doe",
              email: "john.doe@example.com",
              phone: "0612345678",
              birthday: "01/01/1990",
            }}
          />
          <DeliveryChoice
            order={{
              address: "Rue de la Paix",
              city: "Paris",
              postal_code: "75001",
              price: 10,
              status: OrderStatusEnum.DELIVERED,
              id_order: "1",
              id_user: "1",
              id_restaurant: "1",
              menus: [],
              notes: "",
              order_date: new Date(),
              products: [],
              delivery_accepted_datetime: new Date(),
              received_datetime: new Date(),
              restaurant_accepted_datetime: new Date(),
              restaurant_to_delivery_datetime: new Date(),
            }}
            user={{
              id: "1",
              first_name: "John",
              last_name: "Doe",
              email: "john.doe@example.com",
              phone: "0612345678",
              birthday: "01/01/1990",
            }}
          />
          <DeliveryChoice
            order={{
              address: "Rue de la Paix",
              city: "Paris",
              postal_code: "75001",
              price: 10,
              status: OrderStatusEnum.DELIVERED,
              id_order: "1",
              id_user: "1",
              id_restaurant: "1",
              menus: [],
              notes: "",
              order_date: new Date(),
              products: [],
              delivery_accepted_datetime: new Date(),
              received_datetime: new Date(),
              restaurant_accepted_datetime: new Date(),
              restaurant_to_delivery_datetime: new Date(),
            }}
            user={{
              id: "1",
              first_name: "John",
              last_name: "Doe",
              email: "john.doe@example.com",
              phone: "0612345678",
              birthday: "01/01/1990",
            }}
          />
        </div>
      </div>
    </div>
  );
}
