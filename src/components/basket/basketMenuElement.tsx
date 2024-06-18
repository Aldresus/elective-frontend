import { OrderMenu } from "@/entities/order";
import { Small } from "../typography";

interface MenuElementProps
  extends OrderMenu,
    React.HTMLAttributes<HTMLDivElement> {}

export function BasketMenuElement({
  price,
  name,
  products,
  ...props
}: MenuElementProps) {
  return (
    <div>
      <div className="flex gap-2 items-end">
        <div className="w-1/4">1 x</div>
        <div className="w-2/4">{name}</div>
        <div className="w-1/4">{price} €</div>
      </div>

      {products.map((item, i) => {
        return (
          <div key={i} className="flex">
            <div className="ml-6 w-1/4"> </div>
            <Small>{item.name}</Small>
          </div>
        );
      })}
    </div>
  );
}
