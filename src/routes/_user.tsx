import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { currentOrderContext } from "@/contexts/currentOrderContext";
import { CurrentOrderContext } from "@/entities/currentOrderContext";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  OrderMenu,
  OrderProduct,
  productToOrderProduct,
} from "@/entities/order";

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
    id_user: localStorageCurrentOrder?.id_user || "111111111111111111111111", //placeholder
    notes: localStorageCurrentOrder?.notes || "",
    menus: localStorageCurrentOrder?.menus || [],
    products: localStorageCurrentOrder?.products || [],
    postal_code: localStorageCurrentOrder?.postal_code || "",
    price: localStorageCurrentOrder?.price || 0,
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
    calculateTotalPrice: () => 0,
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
    let newItems = [...currentOrder.products];
    //check if product is already in the order
    const productInOrder = currentOrder.products.findIndex(
      (item) => item.id_product === product.id_product
    );

    if (productInOrder === -1) {
      newItems = [...newItems, { ...product, quantity }];
    } else {
      newItems[productInOrder].quantity += quantity;
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

  const removeProduct = (product: OrderProduct) => {
    //find the product in the order and remove 1 to quantity and if quantity is 0 remove the product
    const productInOrder = currentOrder.products.findIndex(
      (item) => item.id_product === product.id_product
    );

    if (productInOrder !== -1) {
      const newItems = [...currentOrder.products];
      newItems[productInOrder].quantity -= 1;
      if (newItems[productInOrder].quantity === 0) {
        newItems.splice(productInOrder, 1);
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
    }
  };

  const removeMenu = (menu: OrderMenu) => {
    // remove the menu from the order by verifying the id_menu and the products inside, only remove one occurrence
    const menuInOrder = currentOrder.menus.findIndex(
      (item) => item.id_menu === menu.id_menu
    );

    if (menuInOrder !== -1) {
      const newItems = [...currentOrder.menus];
      newItems.splice(menuInOrder, 1);
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
    }
  };

  const clearOrder = () => {
    const emptyOrder: CurrentOrderContext = {
      address: currentOrder.address,
      city: currentOrder.city,
      postal_code: currentOrder.postal_code,
      id_restaurant: "",
      id_user: "111111111111111111111111",
      notes: "",

      price: 0,
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

      calculateTotalPrice: () => 0,
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

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    currentOrder.products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    currentOrder.menus.forEach((menu) => {
      totalPrice += menu.price;
    });

    return totalPrice;
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
          calculateTotalPrice,
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
