import { Plus } from "lucide-react";
import { Large, Small } from "../typography";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ProductCardProps } from "./props/productCardProps";

export function VerticalProductCard({
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
      className="w-[200px] aspect-[2/3] bg-card shadow-none border-none"
      {...props}
    >
      <div className="h-2/3 aspect-square">
        <div className="object-fill h-full w-full ">
          <img
            src="/src/assets/test/test.webp"
            alt="restaurant"
            className="relative h-full w-full object-cover rounded-t-md"
          />
        </div>
      </div>

      <div className="h-1/3 flex justify-between items-end gap-2 p-2">
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
