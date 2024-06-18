import { OrderMenu, OrderProduct } from "@/entities/order";
import { BasketMenuElement } from "./basketMenuElement";
import { BasketProductElement } from "./basketProductElement";
import { Large } from "../typography";
import { Separator } from "../ui/separator";

interface BasketSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  menus: OrderMenu[];
  products: OrderProduct[];
  totalPrice: number;
}

export function BasketSummary({
  menus,
  products,
  totalPrice,
  ...props
}: BasketSummaryProps) {
  return (
    <div className="space-y-4">
      {menus.map((menu, i) => {
        return <BasketMenuElement key={i} {...menu} />;
      })}

      {products.map((product, i) => {
        return <BasketProductElement key={i} {...product} />;
      })}

      <div className="flex gap-2 justify-between">
        <Large className="w-1/4 text-center">Total : </Large>
        <Large className="w-2/4 text-center"></Large>
        <Large className="w-1/4 text-center">{totalPrice} €</Large>
      </div>
    </div>
  );
}
