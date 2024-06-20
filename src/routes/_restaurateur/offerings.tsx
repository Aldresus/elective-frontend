import SearchBar from "@/components/common/searchBar";
import AddOfferingCard from "@/components/restaurant/addOfferingCard";
import { HorizontalMenuCard } from "@/components/restaurant/menu/horizontalMenuCard";
import { HorizontalItemCard } from "@/components/restaurant/primitives/horizontalItemCard";
import { HorizontalProductCard } from "@/components/restaurant/product/horizontalProductCard";
import { H1, H2 } from "@/components/typography";
import { restaurateurContext } from "@/contexts/restaurateurContext";
import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
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
    queryKey: ["product", restaurateur.restaurant.id_restaurant],
    queryFn: async () => {
      const response = await axiosInstance(token).get(`/product/`, {
        params: {
          id_restaurant: restaurateur.restaurant.id_restaurant,
        },
      });
      console.log("products", response.data);

      return response.data as Array<Product>;
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <H1>{restaurateur.restaurant.name}</H1>
      <SearchBar />

      <H2>Menus</H2>
      <div className="flex flex-col gap-2">
        {menusQuery.data?.map((menu) => (
          <Link to="/menu/edit/$menuId" params={{ menuId: menu.id_menu }}>
            <HorizontalItemCard
              cardDescription={menu.description}
              cardPrice={menu.price}
              cardTitle={menu.name}
              imgUrl={menu.menu_image_url}
              addButton={false}
            />
          </Link>
        ))}
      </div>
      <AddOfferingCard type="menu" />

      <H2>Produits</H2>
      <div className="flex flex-col gap-2">
        {productsQuery.data?.map((product) => (
          <Link
            to="/product/edit/$productId"
            params={{ productId: product.id_product }}
          >
            <HorizontalItemCard
              cardDescription={product.description}
              cardPrice={product.price}
              cardTitle={product.name}
              imgUrl={product.product_image_url}
              addButton={false}
            />
          </Link>
        ))}{" "}
      </div>
      <AddOfferingCard type="produit" />
    </div>
  );
}
