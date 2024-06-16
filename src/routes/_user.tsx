import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { basketContext } from "@/contexts/basketContext";
import { BasketContext } from "@/entities/basketContext";
import { FullMenu } from "@/entities/menu";
import { Product } from "@/entities/product";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { OrderMenu, OrderProduct } from "@/entities/order";

export const Route = createFileRoute("/_user")({
  component: UserLayout,
});

function UserLayout() {
  const [localStorageBasket, setLocalStorageBasket] =
    useLocalStorage<BasketContext>("basket");

  const [basket, setBasket] = useState<BasketContext>({
    address: localStorageBasket?.address || "",
    city: localStorageBasket?.city || "",
    id_restaurant: localStorageBasket?.id_restaurant || "",
    id_user: localStorageBasket?.id_user || "",
    notes: localStorageBasket?.notes || "",
    menus: localStorageBasket?.menus || [],
    products: localStorageBasket?.products || [],
    postal_code: localStorageBasket?.postal_code || "",
    price: localStorageBasket?.price || 0,
    status: localStorageBasket?.status || "",
    order_date: localStorageBasket?.order_date || new Date(),
    restaurant_accepted_datetime:
      localStorageBasket?.restaurant_accepted_datetime,
    restaurant_to_delivery_datetime:
      localStorageBasket?.restaurant_to_delivery_datetime,
    received_datetime: localStorageBasket?.received_datetime,
    delivery_accepted_datetime: localStorageBasket?.delivery_accepted_datetime,
    id_order: localStorageBasket?.id_order,
    addProduct: () => {},
    addMenu: () => {},
    removeProduct: () => {},
    removeMenu: () => {},
    clearBasket: () => {},
    setRestaurantId: () => {},
  });

  const setRestaurantId = (restaurantId: string) => {
    setBasket((prev) => {
      return {
        ...prev,
        id_restaurant: restaurantId,
      };
    });
    setLocalStorageBasket((prev) => {
      return {
        ...prev,
        id_restaurant: restaurantId,
      };
    });
  };

  const addProduct = (product: OrderProduct, quantity: number) => {
    console.log("context add product", product);
    console.log("context items", basket);

    const newItems = [...basket.products];

    for (let i = 0; i < quantity; i++) {
      newItems.push(product);
    }

    setBasket((prev) => {
      return {
        ...prev,
        products: newItems,
      };
    });
    setLocalStorageBasket((prev) => {
      return {
        ...prev,
        products: newItems,
      };
    });
  };

  const addMenu = (menu: OrderMenu) => {
    setBasket((prev) => {
      return {
        ...prev,
        menus: [...prev.menus, menu],
      };
    });
    setLocalStorageBasket((prev) => {
      return {
        ...prev,
        menus: [...prev.menus, menu],
      };
    });
  };

  const removeProduct = (product: OrderProduct, quantity: number) => {
    const newItems = [...basket.products];

    for (let i = 0; i < quantity; i++) {
      newItems.splice(newItems.indexOf(product), 1);
    }

    setBasket((prev) => {
      return {
        ...prev,
        products: newItems,
      };
    });
    setLocalStorageBasket((prev) => {
      return {
        ...prev,
        products: newItems,
      };
    });
  };

  const removeMenu = (menu: OrderMenu) => {
    setBasket((prev) => {
      return {
        ...prev,
        menus: prev.menus.filter((item) => item.id_menu !== menu.id_menu),
      };
    });
    setLocalStorageBasket((prev) => {
      return {
        ...prev,
        menus: prev.menus.filter((item) => item.id_menu !== menu.id_menu),
      };
    });
  };

  const clearBasket = () => {
    setBasket((prev) => {
      return {
        ...prev,
        products: [],
        menus: [],
      };
    });
    setLocalStorageBasket((prev) => {
      return {
        ...prev,
        products: [],
        menus: [],
      };
    });
  };

  return (
    <div className="bg-yellow-500 min-h-screen">
      <Navbar className="fixed top-0 left-0 w-full" />
      <div className="bg-red-50 mt-[50px] p-9 w-[1280px] mx-auto">
        <basketContext.Provider
          value={{
            ...basket,
            addProduct,
            addMenu,
            removeProduct,
            removeMenu,
            clearBasket,
            setRestaurantId,
          }}
        >
          <Outlet />
        </basketContext.Provider>
      </div>
      <Footer />
    </div>
  );
}
