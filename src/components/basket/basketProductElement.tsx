import { OrderProduct } from "@/entities/order";

interface ProductElementProps
  extends OrderProduct,
    React.HTMLAttributes<HTMLDivElement> {}

export function BasketProductElement({
  quantity,
  name,
  price,
  ...props
}: ProductElementProps) {
  return (
    <div className="flex gap-2 items-end">
      <div className="w-1/4">{quantity} x</div>
      <div className="w-2/4">{name}</div>
      <div className="w-1/4">{price * quantity} €</div>
    </div>
  );
}
