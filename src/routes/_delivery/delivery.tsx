import Map from "@/components/common/map";
import DeliveryChoice from "@/components/delivery/deliveryChoice";
import { H1, H2, H3, H4, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, QrCode } from "lucide-react";

export const Route = createFileRoute("/_delivery/delivery")({
  component: delivery,
});

function delivery() {
  return (
    <div className="flex flex-col mx-auto h-full pb-0 gap-2">
      <div className="flex flex-col justify-center min-h-[40vh] w-full">
        <H1 className="mb-2">Detail livraison</H1>
        <Map x={48.560679} y={7.694228} />
      </div>
      <Separator className="w-full" />
      <div className="w-full flex justify-between items-center">
        <H2>Livraison en cours</H2>
        <Large>30.52€</Large>
      </div>
      <div className="flex flex-col items-stretch h-full pb-32">
        <div className="flex-1">
          <Large>Nom du restaurant</Large>
          <p>Adresse restaurant</p>
          <p>Adresse restaurant</p>
        </div>
        <div className="flex-1">
          <Large>Nom du client</Large>
          <p>Adresse du client</p>
          <p>Adresse du client</p>
        </div>
        <Button className="flex gap-1 items-center">
          <QrCode />
          Scanner le QR Code
        </Button>
      </div>
    </div>
  );
}
