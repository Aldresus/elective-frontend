import { BasketModal } from "@/components/basket/basketModal";
import { ItemCarrousel } from "@/components/restaurant/itemCarrousel";
import { RestaurantCategory } from "@/components/restaurant/restaurantCategory";
import { H1 } from "@/components/typography";
import { currentOrderContext } from "@/contexts/currentOrderContext";
import { DecodedAccessToken } from "@/entities/login";

import {
  FullRestaurant,
  MergedRestaurantCategory,
  mergeRestaurantCategory,
} from "@/entities/restaurant";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useEffect } from "react";

export const Route = createFileRoute("/_user/restaurant/$id")({
  component: RestaurantPage,
});

function RestaurantPage() {
  const { id } = Route.useParams();
  const [decodedAccessToken] = useLocalStorage<DecodedAccessToken>("user");
  const currentOrder = useContext(currentOrderContext);

  const query = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const response = await axiosInstance().get(`/restaurant/${id}`);
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

  useEffect(() => {
    //reset the basket when the restaurant changes
    //set the userid to the current user inside the order

    if (decodedAccessToken && !currentOrder.id_user) {
      currentOrder.setUserId(decodedAccessToken.sub);
    }

    if (!currentOrder.id_restaurant || id !== currentOrder.id_restaurant) {
      currentOrder.clearOrder();
      currentOrder.setRestaurantId(id);
    }
  }, [currentOrder, decodedAccessToken, id]);

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
              carouselItems={category.items}
              categoryName={category.name}
            />
          );

        return (
          <RestaurantCategory
            key={category.name}
            categoryName={category.name}
            categoryItems={category.items}
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
