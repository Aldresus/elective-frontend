import FilterButton from "@/components/common/filterButton";
import { RestaurantCard } from "@/components/common/restaurantCard";
import { H2 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { Beer, IceCreamBowl, Pizza, Sandwich, Vegan } from "lucide-react";

export const Route = createFileRoute("/_user/user")({
  component: UserComponent,
});

function UserComponent() {
  return (
    <div className="flex flex-col gap-6 w-full">
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
          <RestaurantCard className="flex-1">La mie tah caline</RestaurantCard>
          <RestaurantCard className="flex-1">La mie tah caline</RestaurantCard>
          <RestaurantCard className="flex-1">La mie tah caline</RestaurantCard>
        </div>
        <Separator />
      </div>
      <div>
        <H2>Restaurants italiens</H2>
        <div className="flex w-full gap-6 overflow-x-scroll">
          <RestaurantCard>La mie tah caline</RestaurantCard>
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
      </div>
    </div>
  );
}
