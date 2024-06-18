import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { LoginBanner } from "@/components/user/loginBanner";
import { useAuth } from "@/lib/auth";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_user")({
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
  component: UserLayout,
});

function UserLayout() {
  const auth = useAuth();
  return (
    <div className="bg-yellow-500 min-h-screen">
      <Navbar className="fixed top-0 left-0 w-full" />
      <div className="bg-red-50 mt-[50px] p-9 w-[1280px] mx-auto">
        <LoginBanner
          className="mb-6"
          hidden={auth.isAuthenticated}
          onclose={() => auth.logout()}
        />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
