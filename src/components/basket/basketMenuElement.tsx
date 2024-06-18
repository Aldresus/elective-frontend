import { OrderMenu } from "@/entities/order";
import { Small } from "../typography";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import clsx from "clsx";

interface MenuElementProps
  extends OrderMenu,
    React.HTMLAttributes<HTMLDivElement> {
  editable?: boolean;
  minus?: () => void;
  add?: () => void;
}

export function BasketMenuElement({
  price,
  name,
  products,
  editable = false,
  minus,
  add,
  ...props
}: MenuElementProps) {
  return (
    <div className={clsx({ "flex gap-2 items-center": editable })}>
      {editable && (
        <Button
          className="w-6 h-6 shrink-0"
          size="icon"
          variant="ghost"
          onClick={minus}
        >
          <Minus />
        </Button>
      )}
      <div className="w-full">
        <div className="flex gap-2 items-end">
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
      {editable && (
        <Button
          className="w-6 h-6 shrink-0"
          size="icon"
          variant="ghost"
          onClick={add}
        >
          <Plus />
        </Button>
      )}
    </div>
  );
}
