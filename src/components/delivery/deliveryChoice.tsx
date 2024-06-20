import { Check, X } from "lucide-react";
import { H3, Large } from "../typography";
import { Card } from "../ui/card";
import { User } from "@/entities/user";
import { Order } from "@/entities/order";

interface DeliveryChoiceProps {
  order: Order;
  user: User;
}

export function DeliveryChoice({ order, user }: DeliveryChoiceProps) {
  return (
    <Card className="py-3 px-6 rounded-xl bg-slate-100">
      <div className="flex justify-between items-center mb-2">
        <H3>{user.first_name}</H3>
        <Large>{order.price} €</Large>
      </div>
      <div className="flex justify-around items-center gap-2">
        <div className="flex-1">
          <p>{order.address}</p>
          <p>
            {order.city} {order.postal_code}
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
