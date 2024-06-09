import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_restaurant")({
  component: RestaurantLayout,
});

function RestaurantLayout() {
  return (
    <div className=" h-screen overflow-hidden mx-auto">
      <Navbar />
      <div className="p-9 w-full h-full">
        <Outlet />
      </div>
      <Footer className="absolute bottom-0 left-0 w-full" />
    </div>
  );
}