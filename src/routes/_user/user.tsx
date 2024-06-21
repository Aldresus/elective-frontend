import FilterButton from "@/components/common/filterButton";
import { RestaurantCard } from "@/components/common/restaurantCard";
import { H2 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { LoginBanner } from "@/components/user/loginBanner";
import { Restaurant } from "@/entities/restaurant";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Beer, IceCreamBowl, Pizza, Sandwich, Vegan } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_user/user")({
  component: UserComponent,
});

function UserComponent() {
  const [hideBanner, setHideBanner] = useState(false);
  // Access the client

  const { isAuthenticated } = useAuth();

  // Queries
  const query = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const response = await axiosInstance().get("/restaurant");
      console.log(response.data);

      return response.data as Array<Restaurant>;
    },
    refetchInterval: 1000 * 60, // refresh every minute
  });

  return (
    <div className="flex flex-col gap-6 w-full">
      {!isAuthenticated && !hideBanner && (
        <LoginBanner className="mb-6" onclose={() => setHideBanner(true)} />
      )}
      <div className="w-full flex flex-wrap justify-center gap-9">
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
      </div>
      <div>
        <H2>Catégorie 0</H2>
        <div className="flex justify-between w-full gap-6 flex-wrap sm:flex-nowrap">
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
        <H2>Catégorie 1</H2>
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
        <H2>Catégorie 2</H2>
        <div className="flex w-full gap-6 overflow-x-scroll">
          {query.data?.map((restaurant) => (
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
    </div>
  );
}
