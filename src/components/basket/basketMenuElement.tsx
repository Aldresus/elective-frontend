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
      <div className="flex gap-2 items-end ">
        <div className="w-1/4 text-center">1 x</div>
        <div className="w-2/4">{name}</div>
        <div className="w-1/4 text-center">{price} €</div>
      </div>

      {products.map((item, i) => {
        return (
          <div key={i} className="flex">
            <div className="ml-6 w-1/4"> </div>
            <Small className="w-2/4">{item.name}</Small>
            <div className="ml-6 w-1/4"> </div>
          </div>
        );
      })}
    </div>
  );
}
