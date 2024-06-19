import SearchBar from "@/components/common/searchBar";
import AddOfferingCard from "@/components/restaurant/addOfferingCard";
import { H1, H2 } from "@/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_restaurateur/restaurantOfferings")({
  component: RestaurantOfferings,
});

function RestaurantOfferings() {
  return (
    <div>
      <H1>Nom du restaurant</H1>
      <SearchBar />
      <div>
        <H2>Menus</H2>
        <p>TODO: Use horizontal product card from Hugo</p>
        <AddOfferingCard type={"produit"} />
      </div>
      <div>
        <H2>Produits</H2>
        <AddOfferingCard type={"menu"} />
      </div>
    </div>
  );
}
