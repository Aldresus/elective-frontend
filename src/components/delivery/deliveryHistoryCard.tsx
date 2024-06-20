import { CircleDashed, CircleDot } from "lucide-react";
import { Large } from "../typography";
import { User } from "@/entities/user";
import { Order } from "@/entities/order";
import { OrderStatusEnum } from "@/enums/orderStatus";

interface DeliveryHistoryCardProps {
  order: Order;
  user: User;
}

export function DeliveryHistoryCard({
  order,
  user,
  ...props
}: DeliveryHistoryCardProps) {
  return (
    <div className="flex items-center justify-around w-full h-1/8 bg-gray-200 rounded-lg py-2">
      <div>
        <Large>
          {user.first_name} {user.last_name}
        </Large>
        <p>
          {order.status === OrderStatusEnum.DELIVERED
            ? order.received_datetime?.toLocaleDateString()
            : order.restaurant_to_delivery_datetime?.toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-col justify-around items-center gap-2">
        <Large>{order.price} €</Large>
        <div className="flex">
          {order.status === OrderStatusEnum.DELIVERED ? (
            <CircleDot className="text-red-500 mr-1" />
          ) : (
            <CircleDashed className="text-green-500 mr-1" />
          )}
          <p
            className={
              order.status === OrderStatusEnum.DELIVERED
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {order.status}
          </p>
        </div>
      </div>
    </div>
  );
}
