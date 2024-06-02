import Navbar from "@/components/common/navbar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user")({
  component: UserLayout,
});

function UserLayout() {
  return (
    <div className="bg-yellow-500 min-h-screen">
      <Navbar className="fixed top-0 left-0 w-full" />
      <div className="mt-[50px]">
        <Outlet />
      </div>
    </div>
  );
}
