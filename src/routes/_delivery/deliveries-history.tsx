import DeliveryHistoryCard from "@/components/delivery/deliveryHistoryCard";
import { H1 } from "@/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_delivery/deliveries-history")({
  component: DeliveriesHistory,
});

function DeliveriesHistory() {
  return (
    <div className="p-0 h-full pb-20">
      <H1 className="mb-2">Historique des livraisons</H1>
      <div className="h-full flex flex-col space-y-2 overflow-auto pb-20">
        <DeliveryHistoryCard stateDelivery="En cours" />
        <DeliveryHistoryCard stateDelivery="Terminée" />
        <DeliveryHistoryCard stateDelivery="En cours" />
        <DeliveryHistoryCard stateDelivery="Terminée" />
        <DeliveryHistoryCard stateDelivery="Terminée" />
        <DeliveryHistoryCard stateDelivery="En cours" />
        <DeliveryHistoryCard stateDelivery="Terminée" />
        <DeliveryHistoryCard stateDelivery="En cours" />
      </div>
    </div>
  );
}
