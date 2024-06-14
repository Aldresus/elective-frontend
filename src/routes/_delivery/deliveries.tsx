import Map from "@/components/common/map";
import DeliveryChoice from "@/components/delivery/deliveryChoice";
import { H1, H2 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import OrderEntity from "@/entities/order";
import UserEntity from "@/entities/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_delivery/deliveries")({
  component: Deliveries,
});

interface IDelivery extends OrderEntity, UserEntity {
  id_order?: string;
  user_address?: string;
  user_city?: string;
  user_postal_code?: string;
  order_name?: string;
  price?: string;
}

function Deliveries() {
  const userData: Array<UserEntity> = [
    {
      first_name: "Jean",
      last_name: "Dupont",
      address: "Rue de la Guerre",
      city: "Lingolsheim",
      postal_code: "67000",
    },
    {
      first_name: "aled",
      last_name: "aled",
      address: "Rue de la aled",
      city: "aled",
      postal_code: "67900",
    },
  ];

  const ordersData: Array<OrderEntity> = [
    {
      id_order: "1",
      price: "100",
    },
    {
      id_order: "2",
      price: "50",
    },
  ];

  const deliveries: IDelivery[] | undefined = ordersData.map(
    (order: OrderEntity, index: number) => ({
      id_order: order.id_order,
      user_address: userData?.[index]?.address,
      user_city: userData?.[index]?.city,
      user_postal_code: userData?.[index]?.postal_code,
      price: order.price,
      order_name: "le nom",
    })
  );

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
          {deliveries.map((delivery: IDelivery | undefined) => (
            <DeliveryChoice key={delivery?.id_order} {...delivery} />
          ))}
        </div>
      </div>
    </div>
  );
}
