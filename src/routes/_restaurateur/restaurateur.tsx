import WaitingCommandCard from "@/components/restaurant/waitingCommandCard";
import { H1, H2, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { restaurateurContext } from "@/contexts/restaurateurContext";
import { Order } from "@/entities/order";
import { OrderStatusEnum } from "@/enums/orderStatus";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createFileRoute("/_restaurateur/restaurateur")({
  component: Restaurant,
});

function Restaurant() {
  const restaurateur = useContext(restaurateurContext);
  const { token } = useAuth();

  console.log(restaurateur);

  const orderQuery = useQuery({
    queryKey: ["order", restaurateur],
    queryFn: async () => {
      console.log("restaurateur", restaurateur);
      const response = await axiosInstance(token).get(`/order/`, {
        params: {
          status: OrderStatusEnum.CREATED,
          id_restaurateur: restaurateur.restaurant.id_restaurant,
        },
      });
      console.log(response.data);

      return response.data as Array<Order>;
    },
  });

  return (
    <div className="w-full h-full">
      <H1>{restaurateur.restaurant.name}</H1>
      <H2>Commandes en attente</H2>
      <div className="h-full flex flex-col justify-between ">
        <div className="h-[90%] flex flex-col gap-4 overflow-auto">
          {orderQuery.data?.map((order) => (
            <WaitingCommandCard order={order} key={order.id_order} />
          ))}
          {orderQuery.isLoading && (
            <div className="flex items-center justify-center h-full">
              Chargement des commandes en attente...
            </div>
          )}
          {orderQuery.data?.length === 0 && (
            <Large className="flex items-center justify-center h-full">
              Aucune commande en attente...
            </Large>
          )}
        </div>
        <Button className="w-full">Commandes en cours</Button>
      </div>
    </div>
  );
}
