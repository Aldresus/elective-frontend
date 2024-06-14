import { Plus } from "lucide-react";
import { Large, Small } from "../typography";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ProductCardProps } from "./props/productCardProps";

export function HorizontalProductCard({
  className,
  title,
  imageUrl,
  children,
  price,
  description,
  ...props
}: ProductCardProps) {
  return (
    <Card
      className="flex bg-card shadow-none border-none h-[200px] w-full gap-4"
      {...props}
    >
      <div className="h-full aspect-square">
        <div className="object-fill h-full">
          <img
            src="/src/assets/test/test.webp"
            alt="restaurant"
            className="relative h-full w-full object-cover rounded-l-md aspect-square"
          />
        </div>
      </div>

      <div className="w-full flex justify-between items-end gap-2 p-2">
        <div className="h-full flex flex-col justify-start gap-1">
          <Large>{title}</Large>
          <Small className="text-ellipsis line-clamp-3">{description}</Small>
          <p>{price} €</p>
        </div>

        <Button size="icon" className="shrink-0">
          <Plus />
        </Button>
      </div>
    </Card>
  );
}
