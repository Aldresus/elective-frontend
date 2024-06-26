import { OrderMenu, OrderProduct } from "@/entities/order";
import { BasketMenuElement } from "./basketMenuElement";
import { BasketProductElement } from "./basketProductElement";
import { Large } from "../typography";
import { cn } from "@/lib/utils";

interface BasketSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  menus: OrderMenu[];
  products: OrderProduct[];
  totalPrice: number;
  editable?: boolean;
  productMinus?: (product: OrderProduct) => void;
  productAdd?: (product: OrderProduct) => void;

  menuRemove?: (menu: OrderMenu) => void;
  menuAdd?: (menu: OrderMenu) => void;
}

export function BasketSummary({
  menus,
  products,
  totalPrice,
  editable = false,
  productMinus,
  productAdd,
  menuRemove,
  menuAdd,
  className,
  ...props
}: BasketSummaryProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {menus.map((menu, i) => {
        return (
          <BasketMenuElement
            minus={() => menuRemove && menuRemove(menu)}
            add={() => menuAdd && menuAdd(menu)}
            editable={editable}
            key={i}
            {...menu}
          />
        );
      })}

      {products.map((product, i) => {
        return (
          <BasketProductElement
            minus={() => productMinus && productMinus(product)}
            add={() => productAdd && productAdd(product)}
            editable={editable}
            key={i}
            {...product}
          />
        );
      })}

      <div className="flex gap-2 justify-between">
        <Large className="w-1/4 text-center">Total : </Large>
        <Large className="w-2/4 text-center"></Large>
        <Large className="w-1/4 text-center">{totalPrice} €</Large>
      </div>
    </div>
  );
}
