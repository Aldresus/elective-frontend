import SearchBar from "@/components/common/searchBar";
import Command from "@/components/restaurant/command";
import { H1, H2 } from "@/components/typography";
import { restaurateurContext } from "@/contexts/restaurateurContext";
import { Order } from "@/entities/order";
import { OrderStatusEnum } from "@/enums/orderStatus";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createFileRoute("/_restaurateur/commands")({
  component: CommandMonitoring,
});

function CommandMonitoring() {
  const restaurateur = useContext(restaurateurContext);
  const { token } = useAuth();

  const orderQuery = useQuery({
    queryKey: ["orders", restaurateur.restaurant.id_restaurant],
    queryFn: async () => {
      const response = await axiosInstance(token).get(`/order/`, {
        params: {
          restaurant_id: restaurateur.restaurant.id_restaurant,
        },
      });
      console.log(response.data);
      return response.data as Array<Order>;
    },
  });

  return (
    <div className="flex flex-col w-full h-full overflow-auto pb-16 gap-3">
      <div className="w-full">
        <H1 className="w-full pb-2">Gestion des commandes</H1>
        <SearchBar />
      </div>
      <div>
        <H2 className="p-0">En cours</H2>
        <div className="flex flex-col gap-3">
          {orderQuery.data
            ?.filter((order) => order.status === OrderStatusEnum.CREATED)
            .map((order) => (
              <Command
                clientName="client 1"
                deliveryPersonName="client 1"
                order={order}
                key={order.id_order}
              />
            ))}
        </div>
      </div>
      <div>
        <H2 className="p-0">Terminées</H2>
        <div className="flex flex-col gap-3">
          {orderQuery.data
            ?.filter((order) => order.status === OrderStatusEnum.DELIVERED)
            .map((order) => (
              <Command
                clientName="client 1"
                deliveryPersonName="client 1"
                order={order}
                key={order.id_order}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
