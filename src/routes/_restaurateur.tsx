import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { EditProfileModal } from "@/components/restaurant/editProfileModal";
import { ModalContext } from "@/components/restaurant/modalContext";
import { restaurateurContext } from "@/contexts/restaurateurContext";
import { DecodedAccessToken } from "@/entities/login";
import { RestaurateurContext } from "@/entities/restaurateurContext";
import { UsersRestaurants } from "@/entities/usersRestaurants";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

export const Route = createFileRoute("/_restaurateur")({
  component: RestaurateurLayout,
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RestaurateurLayout() {
  const [decodedAccessToken] = useLocalStorage<DecodedAccessToken>("user");
  const { token } = useAuth();

  const [restaurateurState, setRestaurateurState] =
    useState<RestaurateurContext>({
      restaurant: {
        address: "",
        city: "",
        banner_url: "",
        business_hours: "",
        id_restaurant: "",
        email: "",
        name: "",
        food_type: "",
        postal_code: "",
        price_range: "",
        rating: 0,
      },
    });

  useQuery({
    queryKey: ["userRestaurant", decodedAccessToken.sub],
    queryFn: async () => {
      const response = await axiosInstance(token).get(
        `/restaurant/user/${decodedAccessToken.sub}`
      );

      const responseData = response.data as Array<UsersRestaurants>;

      console.log("responseData", responseData);
      setRestaurateurState((prev) => {
        return {
          ...prev,
          restaurant: responseData[0].restaurant,
        };
      });

      return response.data;
    },
    refetchInterval: 60000,
  });

  const [modalIsOpen, setmodalIsOpen] = useState<boolean>(false);
  return (
    <ModalContext.Provider value={{ modalIsOpen, setmodalIsOpen }}>
      <restaurateurContext.Provider
        value={{
          restaurant: restaurateurState.restaurant,
        }}
      >
        <div className="h-screen">
          <Navbar
            isAdress={false}
            isRestaurateur={true}
            className="fixed top-0 left-0 w-full"
          />
          <div className="mt-[50px] p-9 w-full mx-auto min-h-screen">
            <Outlet />
          </div>
          <EditProfileModal />
          <Footer className=" w-full" />
        </div>
      </restaurateurContext.Provider>
    </ModalContext.Provider>
  );
}
