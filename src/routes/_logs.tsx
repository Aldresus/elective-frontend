import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_logs")({
  component: LogsLayout,
});

function LogsLayout() {
  return (
    <div className="bg-yellow-500 min-h-screen">
      <Navbar className="fixed top-0 left-0 w-full" />
      <div className="bg-red-50 mt-[50px] p-9 w-[1280px] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
