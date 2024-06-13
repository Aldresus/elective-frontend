import { CircleDashed, CircleDot } from "lucide-react";
import { Large } from "../typography";
import DeliveriesEntity from "@/entities/deliveries";

export default function DeliveryHistoryCard(props: DeliveriesEntity) {
  return (
    <div className="flex items-center justify-around w-full h-1/8 bg-gray-200 rounded-lg py-2">
      <div>
        <Large>{props.order_name}</Large>
        <Large>
          {props.user_first_name} {props.user_last_name}
        </Large>
        <p>
          {props.status === "Terminée"
            ? props.received_datetime?.toLocaleDateString()
            : props.restaurant_to_delivery_datetime?.toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-col justify-around items-center gap-2">
        <Large>{props.price} €</Large>
        <div className="flex">
          {props.status === "Terminée" ? (
            <CircleDot className="text-red-500 mr-1" />
          ) : (
            <CircleDashed className="text-green-500 mr-1" />
          )}
          <p
            className={
              props.status === "Terminée" ? "text-red-500" : "text-green-500"
            }
          >
            {props.status}
          </p>
        </div>
      </div>
    </div>
  );
}
