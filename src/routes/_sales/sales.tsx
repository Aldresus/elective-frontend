import { H1, H2, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { DecodedAccessToken } from "@/entities/login";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_sales/sales")({
  component: Sales,
});

interface ProductType {
  id_product: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface MenuType {
  id_menu: string;
  name: string;
  description: string;
  price: number;
  products: ProductType;
}

interface OrderType {
  id_order: string;
  order_date: string;
  status: string;
  price: number;
  postal_code: string;
  address: string;
  city: string;
  notes: string;
  restaurant_to_delivery_datetime: string;
  received_datetime: string;
  restaurant_accepted_datetime: string;
  delivery_accepted_datetime: string;
  id_user: string;
  id_restaurant: string;
  menus: Array<MenuType>;
  products: Array<ProductType>;
}

function Sales() {
  const [ca, setCa] = useState<number>(0);

  const { token } = useAuth();

  const [decodedAccessToken] = useLocalStorage<DecodedAccessToken>("user");

  const navigate = Route.useNavigate();

  useQuery({
    queryKey: ["ca", "ca"],
    queryFn: async () => {
      const rawDataAccepted = await axiosInstance(token).get(
        `/order?status=ACCEPTED`
      );

      const finalDataAccepted: Array<OrderType> = await rawDataAccepted.data;
      console.log("finalDataAccepted: ", finalDataAccepted);

      var total: number = 0;

      await finalDataAccepted.forEach((order) => {
        total += order.price;
      });

      const rawDataToPickup = await axiosInstance(token).get(
        `/order?status=READY_TO_PICKUP`
      );

      const finalDataToPickup: Array<OrderType> = await rawDataToPickup.data;
      console.log("finalDataToPickup: ", finalDataToPickup);

      await finalDataToPickup.forEach((order) => {
        total += order.price;
      });

      const rawDataOnTheWay = await axiosInstance(token).get(
        `/order?status=ON_THE_WAY`
      );

      const finalDataOnTheWay: Array<OrderType> = await rawDataOnTheWay.data;
      console.log("finalDataOnTheWay: ", finalDataOnTheWay);

      await finalDataOnTheWay.forEach((order) => {
        total += order.price;
      });

      setCa(total);
      console.log(ca);

      return total;
    },
  });

  useEffect(() => {
    console.log("ca", ca);
  }, [ca]);

  return (
    <div className="w-full flex flex-col gap-3">
      <H1>
        Bonjour {decodedAccessToken.first_name} {decodedAccessToken.last_name},
      </H1>
      <Button
        className="w-full flex gap-1 justify-between"
        variant="outline"
        onClick={() => {
          navigate({
            to: "/passationsCommandes",
          });
        }}
      >
        Passations des commandes
        <ChevronRight />
      </Button>
      <Button
        className="w-full flex gap-1 justify-between"
        variant="outline"
        onClick={() => {
          navigate({
            to: "/acceptationsCommandes",
          });
        }}
      >
        Acceptations des commandes
        <ChevronRight />
      </Button>
      <Button
        className="w-full flex gap-1 justify-between"
        variant="outline"
        onClick={() => {
          navigate({
            to: "/acceptationsLivraisons",
          });
        }}
      >
        Acceptations des livraisons
        <ChevronRight />
      </Button>
      <Button
        className="w-full flex gap-1 justify-between"
        variant="outline"
        onClick={() => {
          navigate({
            to: "/acquittementsLivraisons",
          });
        }}
      >
        Acquittements des livraisons
        <ChevronRight />
      </Button>
      <Button
        className="w-full flex gap-1 justify-between"
        variant="outline"
        onClick={() => {
          navigate({
            to: "/allClients",
          });
        }}
      >
        Clients
        <ChevronRight />
      </Button>
      <div>
        <Large>Chiffre d'affaire transactionnel global en cours :</Large>
        <div className="w-full flex justify-center">
          <div className="w-3/4 flex items-center justify-center py-4 bg-slate-200 rounded-[10px]">
            <H2>{ca}€</H2>
          </div>
        </div>
      </div>
    </div>
  );
}
