import { OrderMenu, OrderProduct } from "@/entities/order";
import { BasketMenuElement } from "./basketMenuElement";
import { BasketProductElement } from "./basketProductElement";
import { Large } from "../typography";
import { Separator } from "../ui/separator";
import { Product } from "@/entities/product";

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
  ...props
}: BasketSummaryProps) {
  return (
    <div className="space-y-4">
      {menus.map((menu, i) => {
        return (
          <BasketMenuElement
            minus={() => menuRemove && menuRemove(menu)}
            add={() => menuAdd && menuAdd(menu)}
            editable
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
