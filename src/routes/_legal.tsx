import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_legal")({
  component: LegalLayout,
});

function LegalLayout() {
  return (
    <div className=" min-h-screen">
      <Navbar className="fixed top-0 left-0 w-full" />
      <div className=" mt-[50px] p-9 max-w-[680px] mx-auto min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
