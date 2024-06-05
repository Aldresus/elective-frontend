import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { LoginBanner } from "@/components/user/loginBanner";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_user")({
  component: UserLayout,
});

function UserLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="bg-yellow-500 min-h-screen">
      <Navbar className="fixed top-0 left-0 w-full" />
      <div className="bg-red-50 mt-[50px] p-9 w-[1280px] mx-auto">
        <LoginBanner
          className="mb-6"
          hidden={!isLoggedIn}
          onclose={() => setIsLoggedIn(false)}
        />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
