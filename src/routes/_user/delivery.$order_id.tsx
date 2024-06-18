import { BasketAddressDisplay } from "@/components/basket/basketAddressDisplay";
import { BasketSummary } from "@/components/basket/basketSummary";
import { H1, H2, Large } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/entities/order";
import { OrderStatus } from "@/enums/orderStatus";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

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
      <Large className="bg-hungry-yellow-500 h-12 rounded-lg flex items-center justify-center">
        {query.data?.status
          ? OrderStatus[query.data?.status]
          : "En attente de traitement"}
      </Large>
      <Separator />
      <div>
        <H2>Adresse de livraison</H2>
        <BasketAddressDisplay
          {...(query.data || {
            //backup data
            address: "",
            postal_code: "",
            city: "",
          })}
        />
      </div>
      <Separator />
      <H2>Contenu de la commande</H2>
      <BasketSummary
        totalPrice={totalPrice}
        menus={query.data?.menus || []}
        products={query.data?.products || []}
      />
    </div>
  );
}
