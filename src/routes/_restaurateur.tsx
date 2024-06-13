import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { ModalContext } from "@/components/restaurant/modalContext";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_restaurateur")({
  component: RestaurateurLayout,
});

function RestaurateurLayout() {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ modalIsOpen, setmodalIsOpen }}>
      <div className=" h-screen overflow-hidden mx-auto">
        <Navbar isAdress={false} />
        <div className="p-9 w-full h-full">
          <Outlet />
        </div>
        <Footer className="absolute bottom-0 left-0 w-full" />
      </div>
    </ModalContext.Provider>
  );
}
