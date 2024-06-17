import BasketModal from "@/components/restaurant/basketModal";
import { ItemCarrousel } from "@/components/restaurant/itemCarrousel";
import { RestaurantCategory } from "@/components/restaurant/restaurantCategory";
import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { currentOrderContext } from "@/contexts/currentOrderContext";

import {
  FullRestaurant,
  MergedRestaurantCategory,
  mergeRestaurantCategory,
} from "@/entities/restaurant";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBasket } from "lucide-react";
import { useContext, useEffect } from "react";

export const Route = createFileRoute("/_user/restaurant/$id")({
  component: RestaurantPage,
});

function RestaurantPage() {
  const { id } = Route.useParams();

  const query = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/restaurant/${id}`);
      // console.log(response.data);
      let finalData = response.data as FullRestaurant;

      finalData = {
        ...response.data,
        Restaurant_Categories: mergeRestaurantCategory(
          response.data.Restaurant_Categories
        ),
      };

      console.log(finalData);

      return finalData;
    },
    refetchInterval: 1000 * 60, // refresh every minute
  });

  const currentOrder = useContext(currentOrderContext);

  useEffect(() => {
    console.log("useEffect", currentOrder);
    console.log(
      "useEffect",
      id,
      currentOrder.id_restaurant,
      id !== currentOrder.id_restaurant
    );

    if (!currentOrder.id_restaurant || id !== currentOrder.id_restaurant) {
      currentOrder.clearOrder();
      currentOrder.setRestaurantId(id);
    }
  }, [currentOrder, id]);

  return (
    <div className="space-y-6 w-full">
      <img
        className="w-full h-[200px] object-cover rounded-[20px]"
        src={query.data?.banner_url}
        alt="restaurant"
      />

      <H1 className="text-center">{query.data?.name}</H1>
      {query.data?.Restaurant_Categories.map((category, i) => {
        category = category as MergedRestaurantCategory;
        if (i === 0)
          return (
            <ItemCarrousel
              key={category.name}
              items={category.items}
              categoryName={category.name}
            />
          );

        return (
          <RestaurantCategory
            key={category.name}
            categoryName={category.name}
            items={category.items}
          />
        );
      })}
      {currentOrder.id_restaurant &&
        (currentOrder.products.length > 0 || currentOrder.menus.length > 0) && (
          <BasketModal />
        )}
    </div>
  );
}
