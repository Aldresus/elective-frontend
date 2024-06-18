import { BasketMenuElement } from "@/components/basket/basketMenuElement";
import { BasketProductElement } from "@/components/basket/basketProductElement";
import { BasketSummary } from "@/components/basket/basketSummary";
import { H1, H2 } from "@/components/typography";
import { Order } from "@/entities/order";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/delivery/$order_id")({
  component: DeliveryTracker,
});

function DeliveryTracker() {
  const { order_id } = Route.useParams();
  let totalPrice = 0;

  const query = useQuery({
    queryKey: ["delivery", "order_id"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/order/${order_id}`);
      console.log(response.data);
      return response.data as Order;
    },
    refetchInterval: 1000 * 60, // refresh every minute
  });

  query.data?.products.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });
  query.data?.menus.forEach((menu) => {
    totalPrice += menu.price;
  });

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <H1 className="text-center">Votre commande</H1>
      <div>
        Votre commande est en cours de traitement. Vous pouvez suivre son
        execution ici
      </div>
      <H2>Adresse de livraison</H2>
      <div>
        <div>{query.data?.address}</div>
        <div>{query.data?.postal_code}</div>
        <div>{query.data?.city}</div>
      </div>
      <H2>Contenu de la commande</H2>
      <BasketSummary
        totalPrice={totalPrice}
        menus={query.data?.menus || []}
        products={query.data?.products || []}
      />
      <div className="text-center">
        {query.data?.status || "En attente de traitement"}
      </div>
    </div>
  );
}
