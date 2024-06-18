import { Check, X } from "lucide-react";
import { H3, Large } from "../typography";
import OrderEntity from "@/entities/order";
import { Card } from "../ui/card";
import { User } from "@/entities/user";

export interface IDelivery extends OrderEntity, User {
  user_address?: string;
  user_city?: string;
  user_postal_code?: string;
  order_name?: string;
  price?: string;
  status?: string;
}

export default function DeliveryChoice({ ...props }: IDelivery) {
  return (
    <Card className="py-3 px-6 rounded-xl bg-slate-100">
      <div className="flex justify-between items-center mb-2">
        <H3>{props.order_name}</H3>
        <Large>{props.price} €</Large>
      </div>
      <div className="flex justify-around items-center gap-2">
        <div className="flex-1">
          <p>{props.user_address}</p>
          <p>
            {props.user_city} {props.user_postal_code}
          </p>
        </div>
        <div className="px-3">
          <Check />
        </div>
        <div className="px-3 pr-0">
          <X />
        </div>
      </div>
    </Card>
  );
}
