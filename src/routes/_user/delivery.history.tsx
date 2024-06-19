import { BasketSummary } from "@/components/basket/basketSummary";
import { H1, Large, Small } from "@/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Order, OrderMenu, OrderProduct } from "@/entities/order";
import { Restaurant } from "@/entities/restaurant";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/delivery/history")({
  component: OrderHistory,
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function OrderHistory() {
  const { token } = useAuth();

  const totalPrice = (
    menus: Array<OrderMenu>,
    products: Array<OrderProduct>
  ) => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    menus.forEach((menu) => {
      totalPrice += menu.price;
    });

    return totalPrice;
  };

  const orderQuery = useQuery({
    queryKey: ["delivery", "history"],
    queryFn: async () => {
      const response = await axiosInstance(token as string).get("/order/");
      console.log(response.data);

      return response.data as Array<Order>;
    },
  });

  const restaurantQuery = useQuery({
    queryKey: ["delivery", "restaurant"],
    queryFn: async () => {
      //iterate through the orders and get unique restaurants
      const restaurantsId: Array<string> = [];

      orderQuery.data?.forEach((order) => {
        if (restaurantsId.includes(order.id_restaurant)) return;
        restaurantsId.push(order.id_restaurant);
      });

      const response = await Promise.all(
        restaurantsId.map(async (restaurantId) => {
          const res = await axiosInstance(token as string).get(
            `/restaurant/${restaurantId}`
          );
          console.log(res.data);
          return res.data as Restaurant;
        })
      );

      console.log(response);

      return response;
    },
    enabled: !!orderQuery.data,

    // const restaurants = orderQuery.data?.map((order) => {
    // const res = await axiosInstance(token).get(`/restaurant/${order.id_restaurant}`);
    // console.log(res.data);
    // return res.data as Restaurant;
  });

  return (
    <div className="space-y-4">
      <H1>Historique des commandes</H1>
      <Accordion type="single" collapsible>
        {orderQuery.data?.map((order) => (
          <AccordionItem value={order.id_order}>
            <AccordionTrigger className="flex justify-start items-center gap-4">
              <Small>
                {new Date(order.received_datetime as Date).toLocaleDateString(
                  "fr-FR"
                )}
              </Small>
              <Large>
                {
                  restaurantQuery.data?.find(
                    (restaurant) =>
                      restaurant.id_restaurant === order.id_restaurant
                  )?.name
                }
              </Large>
            </AccordionTrigger>
            <AccordionContent className="bg-card p-4 rounded">
              <BasketSummary
                {...order}
                totalPrice={totalPrice(order.menus, order.products)}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
