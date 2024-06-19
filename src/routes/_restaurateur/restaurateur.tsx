import WaitingCommandCard from "@/components/restaurant/waitingCommandCard";
import { H1, H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Order } from "@/entities/order";
import { OrderStatusEnum } from "@/enums/orderStatus";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_restaurateur/restaurateur")({
  component: Restaurant,
});

const testOrder: Order = {
  address: "test address",
  city: "city",
  id_order: "1321323213123123",
  id_restaurant: "1321323213123123",
  id_user: "1321323213123123",
  menus: [
    {
      description: "test menu",
      id_menu: "1321323213123123",
      name: "test menu",
      price: 120,
      products: [
        {
          description: "test product",
          id_product: "1321323213123123",
          name: "test product",
          price: 2,
          quantity: 1,
        },
        {
          description: "test product 2",
          id_product: "13213232131231232",
          name: "test product2",
          price: 21,
          quantity: 2,
        },
      ],
    },
  ],

  notes: "",
  order_date: new Date(),
  postal_code: "",
  price: 150,
  products: [
    {
      description: "test product",
      id_product: "1321323213123123",
      name: "test product",
      price: 2,
      quantity: 1,
    },
    {
      description: "test product 2",
      id_product: "13213232131231232",
      name: "test product2",
      price: 21,
      quantity: 2,
    },
  ],
  received_datetime: new Date(),
  status: OrderStatusEnum.CREATED,
};

function Restaurant() {
  return (
    <div className="w-full h-full">
      <H1>Nom du restaurant</H1>
      <H2>Commandes en attente</H2>
      <div className="h-full flex flex-col justify-between pb-40">
        <div className="h-[90%] flex flex-col gap-4 overflow-auto">
          <WaitingCommandCard order={testOrder} />
        </div>
        <Button className="w-full">Commandes en cours</Button>
      </div>
    </div>
  );
}
