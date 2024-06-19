import SearchBar from "@/components/common/searchBar";
import AddOfferingCard from "@/components/restaurant/addOfferingCard";
import { HorizontalMenuCard } from "@/components/restaurant/menu/horizontalMenuCard";
import { HorizontalProductCard } from "@/components/restaurant/product/horizontalProductCard";
import { H1, H2 } from "@/components/typography";
import { restaurateurContext } from "@/contexts/restaurateurContext";
import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createFileRoute("/_restaurateur/offerings")({
  component: RestaurantOfferings,
});

function RestaurantOfferings() {
  const { token } = useAuth();
  const restaurateur = useContext(restaurateurContext);

  const menusQuery = useQuery({
    queryKey: ["menu", restaurateur.restaurant.id_restaurant],
    queryFn: async () => {
      const response = await axiosInstance(token).get(`/menu/`, {
        params: {
          id_restaurant: restaurateur.restaurant.id_restaurant,
        },
      });
      console.log(response.data);

      return response.data as Array<Menu>;
    },
  });

  const productsQuery = useQuery({
    queryKey: ["menu", restaurateur.restaurant.id_restaurant],
    queryFn: async () => {
      const response = await axiosInstance(token).get(`/produit/`, {
        params: {
          id_restaurant: restaurateur.restaurant.id_restaurant,
        },
      });
      console.log(response.data);

      return response.data as Array<Product>;
    },
  });

  return (
    <div>
      <H1>Nom du restaurant</H1>
      <SearchBar />
      <div>
        <H2>Menus</H2>
        {menusQuery.data?.map((menu) => (
          <HorizontalMenuCard key={menu.id_menu} menuContent={menu} />
        ))}
        <AddOfferingCard type="menu" />
      </div>
      <div>
        <H2>Produits</H2>
        {productsQuery.data?.map((product) => (
          <HorizontalProductCard key={product.id_product} product={product} />
        ))}
        <AddOfferingCard type="produit" />
      </div>
    </div>
  );
}
