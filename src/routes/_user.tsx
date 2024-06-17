import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { currentOrderContext } from "@/contexts/currentOrderContext";
import { CurrentOrderContext } from "@/entities/currentOrderContext";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { OrderMenu, OrderProduct } from "@/entities/order";

export const Route = createFileRoute("/_user")({
  component: UserLayout,
});

function UserLayout() {
  const [localStorageCurrentOrder, setLocalStorageCurrentOrder] =
    useLocalStorage<CurrentOrderContext>("currentOrder");

  const [currentOrder, setCurrentOrder] = useState<CurrentOrderContext>({
    address: localStorageCurrentOrder?.address || "",
    city: localStorageCurrentOrder?.city || "",
    id_restaurant: localStorageCurrentOrder?.id_restaurant || "",
    id_user: localStorageCurrentOrder?.id_user || "",
    notes: localStorageCurrentOrder?.notes || "",
    menus: localStorageCurrentOrder?.menus || [],
    products: localStorageCurrentOrder?.products || [],
    postal_code: localStorageCurrentOrder?.postal_code || "",
    price: localStorageCurrentOrder?.price || 0,
    status: localStorageCurrentOrder?.status || "",
    order_date: localStorageCurrentOrder?.order_date || new Date(),
    restaurant_accepted_datetime:
      localStorageCurrentOrder?.restaurant_accepted_datetime,
    restaurant_to_delivery_datetime:
      localStorageCurrentOrder?.restaurant_to_delivery_datetime,
    received_datetime: localStorageCurrentOrder?.received_datetime,
    delivery_accepted_datetime:
      localStorageCurrentOrder?.delivery_accepted_datetime,
    id_order: localStorageCurrentOrder?.id_order,
    addProduct: () => {},
    addMenu: () => {},
    removeProduct: () => {},
    removeMenu: () => {},
    clearOrder: () => {},
    setRestaurantId: () => {},
    setAddress: () => {},
  });

  const setRestaurantId = (restaurantId: string) => {
    setCurrentOrder((prev) => {
      return {
        ...prev,
        id_restaurant: restaurantId,
      };
    });
    setLocalStorageCurrentOrder((prev) => {
      return {
        ...prev,
        id_restaurant: restaurantId,
      };
    });
  };

  const addProduct = (product: OrderProduct, quantity: number) => {
    console.log("context add product", product);
    console.log("context items", currentOrder);

    const newItems = [...currentOrder.products];

    for (let i = 0; i < quantity; i++) {
      newItems.push(product);
    }

    setCurrentOrder((prev) => {
      return {
        ...prev,
        products: newItems,
      };
    });
    setLocalStorageCurrentOrder((prev) => {
      return {
        ...prev,
        products: newItems,
      };
    });
  };

  const addMenu = (menu: OrderMenu) => {
    const newItems = [...currentOrder.menus];

    newItems.push(menu);

    setCurrentOrder((prev) => {
      return {
        ...prev,
        menus: newItems,
      };
    });
    setLocalStorageCurrentOrder((prev) => {
      return {
        ...prev,
        menus: newItems,
      };
    });
  };

  const removeProduct = (product: OrderProduct, quantity: number) => {
    const newItems = [...currentOrder.products];

    for (let i = 0; i < quantity; i++) {
      newItems.splice(newItems.indexOf(product), 1);
    }

    setCurrentOrder((prev) => {
      return {
        ...prev,
        products: newItems,
      };
    });
    setLocalStorageCurrentOrder((prev) => {
      return {
        ...prev,
        products: newItems,
      };
    });
  };

  const removeMenu = (menu: OrderMenu) => {
    setCurrentOrder((prev) => {
      return {
        ...prev,
        menus: prev.menus.filter((item) => item.id_menu !== menu.id_menu),
      };
    });
    setLocalStorageCurrentOrder((prev) => {
      return {
        ...prev,
        menus: prev.menus.filter((item) => item.id_menu !== menu.id_menu),
      };
    });
  };

  const clearOrder = () => {
    const emptyOrder: CurrentOrderContext = {
      address: "",
      city: "",
      id_restaurant: "",
      id_user: "",
      notes: "",
      postal_code: "",
      price: 0,
      status: "",
      order_date: new Date(),
      restaurant_accepted_datetime: undefined,
      restaurant_to_delivery_datetime: undefined,
      received_datetime: undefined,
      delivery_accepted_datetime: undefined,
      id_order: undefined,

      menus: [],
      products: [],

      setRestaurantId: () => {},

      addProduct: () => {},
      addMenu: () => {},

      removeProduct: () => {},
      removeMenu: () => {},

      clearOrder: () => {},

      setAddress: () => {},
    };

    setCurrentOrder(emptyOrder);

    setLocalStorageCurrentOrder(emptyOrder);
  };

  const setAddress = (address: {
    address: string;
    city: string;
    postal_code: string;
  }) => {
    console.log("setAddress", address);

    setCurrentOrder((prev) => {
      return {
        ...prev,
        address: address.address,
        city: address.city,
        postal_code: address.postal_code,
      };
    });

    setLocalStorageCurrentOrder((prev) => {
      return {
        ...prev,
        address: address.address,
        city: address.city,
        postal_code: address.postal_code,
      };
    });
  };

  return (
    <div className="bg-yellow-500 min-h-screen">
      <currentOrderContext.Provider
        value={{
          ...currentOrder,
          addProduct,
          addMenu,
          removeProduct,
          removeMenu,
          clearOrder: clearOrder,
          setRestaurantId,
          setAddress,
        }}
      >
        <Navbar className="fixed top-0 left-0 w-full" />
        <div className="bg-red-50 mt-[50px] p-9 w-[1280px] mx-auto">
          <Outlet />
        </div>
        <Footer />
      </currentOrderContext.Provider>
    </div>
  );
}
