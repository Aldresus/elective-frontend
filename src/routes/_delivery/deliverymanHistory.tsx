import { DeliveryHistoryCard } from "@/components/delivery/deliveryHistoryCard";
import { H1 } from "@/components/typography";
import { OrderStatusEnum } from "@/enums/orderStatus";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_delivery/deliverymanHistory")({
  component: DeliveriesmanHistory,
});

function DeliveriesmanHistory() {
  return (
    <div className="p-0 h-full pb-20">
      <H1 className="mb-2">Historique des livraisons</H1>
      <div className="h-full flex flex-col space-y-2 overflow-auto pb-20">
        <DeliveryHistoryCard
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
        <DeliveryHistoryCard
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
        <DeliveryHistoryCard
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
        <DeliveryHistoryCard
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
        <DeliveryHistoryCard
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
        <DeliveryHistoryCard
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
        <DeliveryHistoryCard
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
        <DeliveryHistoryCard
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
        <DeliveryHistoryCard
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
  );
}
