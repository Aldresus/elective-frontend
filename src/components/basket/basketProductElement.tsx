import { OrderProduct } from "@/entities/order";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import clsx from "clsx";
import { cn } from "@/lib/utils";

interface ProductElementProps
  extends OrderProduct,
    React.HTMLAttributes<HTMLDivElement> {
  editable?: boolean;
  minus?: () => void;
  add?: () => void;
}

export function BasketProductElement({
  quantity,
  name,
  price,
  editable = false,
  minus,
  add,
  className,
  ...props
}: ProductElementProps) {
  return (
    <div
      className={cn(clsx({ "flex gap-2 items-center": editable }), className)}
      {...props}
    >
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
      <div className={clsx("flex gap-2 items-end", { "w-full": editable })}>
        <div className="w-1/4 text-center">{quantity} x</div>
        <div className="w-2/4">{name}</div>
        <div className="w-1/4 text-center">{price * quantity} €</div>
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
  // );
}
