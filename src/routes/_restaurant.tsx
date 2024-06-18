import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_restaurant")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    const fallback = "/user";

    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect ?? fallback });
    }
  },
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
