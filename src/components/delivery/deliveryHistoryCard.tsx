import { CircleDashed, CircleDot } from "lucide-react";
import { Large } from "../typography";

interface DeliveryHistoryCardProps {
  stateDelivery: string;
}

export default function DeliveryHistoryCard({
  stateDelivery,
}: DeliveryHistoryCardProps) {
  return (
    <div className="flex items-center justify-around w-full h-1/8 bg-gray-200 rounded-lg py-2">
      <div>
        <Large>Restaurant 1</Large>
        <Large>Nom du client</Large>
        <p>Date de la livraison</p>
      </div>
      <div className="flex flex-col justify-around items-center gap-2">
        <Large>30.52€</Large>
        <div className="flex">
          {stateDelivery === "Terminée" ? (
            <CircleDot className="text-red-500 mr-1" />
          ) : (
            <CircleDashed className="text-green-500 mr-1" />
          )}
          <p
            className={
              stateDelivery === "Terminée" ? "text-red-500" : "text-green-500"
            }
          >
            {stateDelivery}
          </p>
        </div>
      </div>
    </div>
  );
}
