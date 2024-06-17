import FilterButton from "@/components/common/filterButton";
import { RestaurantCard } from "@/components/common/restaurantCard";
import { H2 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { LoginBanner } from "@/components/user/loginBanner";
import { currentOrderContext } from "@/contexts/currentOrderContext";
import { Restaurant } from "@/entities/restaurant";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Beer, IceCreamBowl, Pizza, Sandwich, Vegan } from "lucide-react";
import { useContext, useState } from "react";

export const Route = createFileRoute("/_user/user")({
  component: UserComponent,
});

function UserComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const response = await axiosInstance.get("/restaurant");
      console.log(response.data);

      return response.data as Array<Restaurant>;
    },
    refetchInterval: 1000 * 60, // refresh every minute
  });

  const currentOrder = useContext(currentOrderContext);

  return (
    <div className="flex flex-col gap-6 w-full">
      <LoginBanner
        className="mb-6"
        hidden={!isLoggedIn}
        onclose={() => setIsLoggedIn(false)}
      />
      <div className="w-full flex justify-center gap-9">
        <FilterButton>
          <Pizza size={35} />
        </FilterButton>
        <FilterButton>
          <IceCreamBowl size={35} />
        </FilterButton>
        <FilterButton>
          <Beer size={35} />
        </FilterButton>
        <FilterButton>
          <Sandwich size={35} />
        </FilterButton>
        <FilterButton>
          <Vegan size={35} />
        </FilterButton>
        <FilterButton>
          <Pizza size={35} />
        </FilterButton>
        <FilterButton>
          <IceCreamBowl size={35} />
        </FilterButton>
        <FilterButton>
          <Beer size={35} />
        </FilterButton>
        <FilterButton>
          <Sandwich size={35} />
        </FilterButton>
        <FilterButton>
          <Vegan size={35} />
        </FilterButton>
      </div>
      <div>
        <H2>En ce moment</H2>
        <div className="flex justify-between w-full gap-6">
          {/* <RestaurantCard className="flex-1">La mie tah caline</RestaurantCard>
          <RestaurantCard className="flex-1">La mie tah caline</RestaurantCard>
          <RestaurantCard className="flex-1">La mie tah caline</RestaurantCard> */}
          {query.data?.slice(0, 3).map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.id_restaurant}`}
              key={restaurant.id_restaurant}
            >
              <RestaurantCard
                onClick={() => console.log(restaurant)}
                className="flex-1"
              >
                {restaurant.name}
              </RestaurantCard>
            </Link>
          ))}
        </div>
        <Separator />
      </div>
      <div>
        <H2>Restaurants italiens</H2>
        <div className="flex w-full gap-6 overflow-x-scroll">
          {query.data?.slice(3, 9).map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.id_restaurant}`}
              key={restaurant.id_restaurant}
            >
              <RestaurantCard
                onClick={() => console.log(restaurant)}
                className="w-[300px]"
              >
                {restaurant.name}
              </RestaurantCard>
            </Link>
          ))}
        </div>
        <Separator />
      </div>
      <div>
        <H2>Bon grec sa mère</H2>
        <div className="flex w-full gap-6 overflow-x-scroll">
          {query.data?.slice(9, 15).map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.id_restaurant}`}
              key={restaurant.id_restaurant}
            >
              <RestaurantCard
                onClick={() => console.log(restaurant)}
                className="w-[300px]"
              >
                {restaurant.name}
              </RestaurantCard>
            </Link>
          ))}
        </div>
        <Separator />
      </div>

      {/* <div>
        <H2>Restaurants italiens</H2>
        <div className="flex w-full gap-6 overflow-x-scroll">
          <RestaurantCard className="max-w-[300px]">
            La mie tah caline
          </RestaurantCard>
          <RestaurantCard>La mie tah caline</RestaurantCard>
          <RestaurantCard>La mie tah caline</RestaurantCard>
          <RestaurantCard>La mie tah caline</RestaurantCard>
          <RestaurantCard>La mie tah caline</RestaurantCard>
          <RestaurantCard>La mie tah caline</RestaurantCard>
        </div>
        <Separator />
      </div>
      <div>
        <H2>Bon grec sa mère</H2>
        <div className="flex w-full gap-6 overflow-x-scroll">
          <RestaurantCard> La mie tah caline</RestaurantCard>
          <RestaurantCard> La mie tah caline</RestaurantCard>
          <RestaurantCard> La mie tah caline</RestaurantCard>
          <RestaurantCard> La mie tah caline</RestaurantCard>
          <RestaurantCard> La mie tah caline</RestaurantCard>
        </div>
        <Separator />
      </div>
      <div>
        <H2>j'adore les pates</H2>
        <div className="flex w-full gap-6 overflow-x-scroll">
          <RestaurantCard> La mie tah caline</RestaurantCard>
          <RestaurantCard> La mie tah caline</RestaurantCard>
          <RestaurantCard> La mie tah caline</RestaurantCard>
          <RestaurantCard> La mie tah caline</RestaurantCard>
        </div>
        <Separator />
      </div> */}
    </div>
  );
}
