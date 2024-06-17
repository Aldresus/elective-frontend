import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

export const Route = createFileRoute("/_delivery")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: DeliveryLayout,
});

function DeliveryLayout() {
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
