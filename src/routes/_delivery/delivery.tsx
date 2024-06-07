import Map from "@/components/common/map";
import DeliveryChoice from "@/components/delivery/deliveryChoice";
import { H1, H2 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_delivery/delivery")({
  component: homeDeliveryLayout,
});

function homeDeliveryLayout() {
  return (
    <div className="flex flex-col mx-auto h-full pb-0 gap-2">
      <div className="flex flex-col justify-center min-h-[40vh] w-full">
        <H1 className="mb-2">Choix livraison</H1>
        <Map x={48.560679} y={7.694228} />
      </div>
      <Separator className="w-full" />
      <div className="h-full overflow-hidden">
        <H2>Choix d'une livraison</H2>
        <div className="h-full space-y-2 pb-32 overflow-auto">
          <DeliveryChoice />
          <DeliveryChoice />
          <DeliveryChoice />
          <DeliveryChoice />
          <DeliveryChoice />
          <DeliveryChoice />
        </div>
      </div>
    </div>
  );
}
