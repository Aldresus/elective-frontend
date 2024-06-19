import { useState } from "react";
import { Large } from "../typography";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Order } from "@/entities/order";
import { OrderStatus } from "@/enums/orderStatus";

interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  clientName: string;
  deliveryPersonName: string;

  order: Order;
}

export default function Command({
  clientName,
  deliveryPersonName,
  order,
  ...props
}: CommandProps) {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center" {...props}>
      <button className="w-full">
        <Card
          className="w-full flex items-stretch py-2 px-4"
          onClick={() => setIsDetailOpen(!isDetailOpen)}
        >
          <div className="flex flex-col w-3/5">
            <Large className="flex">{clientName}</Large>
            <Large className="flex">{deliveryPersonName}</Large>
            <p className="flex">{order.order_date.toLocaleDateString()}</p>
          </div>
          <div className="flex flex-1 flex-col justify-around">
            <p className="flex">{OrderStatus[order.status]}</p>
            <p className="flex">{order.price} €</p>
          </div>
          <div className="flex flex-col justify-around">
            {!isDetailOpen && <ChevronRight />}
            {isDetailOpen && <ChevronDown />}
          </div>
        </Card>
      </button>

      {isDetailOpen && (
        <Card className="w-[98%] px-4 py-2 rounded-none rounded-b-[10px] bg-slate-50">
          <Large>Detail commande</Large>
          {order.products.map((product) => (
            <p key={product.id_product}>{product.name}</p>
          ))}
          {order.menus.map((menu) => (
            <p key={menu.id_menu}>{menu.name}</p>
          ))}
        </Card>
      )}
    </div>
  );
}
