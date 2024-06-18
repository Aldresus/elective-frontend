import { OrderMenu, OrderProduct } from "@/entities/order";
import { BasketMenuElement } from "./basketMenuElement";
import { BasketProductElement } from "./basketProductElement";
import { Large } from "../typography";

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
      <div className="flex gap-2 ">
        <Large className="w-3/4">Total : </Large>
        <Large className="w-1/4">{totalPrice} €</Large>
      </div>
    </div>
  );
}
