import { Plus } from "lucide-react";
import { Large, Small } from "../typography";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import type { ProductCardProps } from "./props/productCardProps";
import { isProduct } from "@/entities/categoryContent";
import { cn } from "@/lib/utils";

export function HorizontalProductCard({
  className,
  content,
  ...props
}: ProductCardProps) {
  return (
    <Card
      className={cn(
        "flex bg-card shadow-none border-none h-[200px] w-full gap-4",
        className
      )}
      {...props}
    >
      <div className="h-full aspect-square">
        <div className="object-fill h-full">
          <img
            src={
              isProduct(content)
                ? content.product_image_url
                : content.menu_image_url
            }
            alt="restaurant"
            className="relative h-full w-full object-cover rounded-l-md aspect-square"
          />
        </div>
      </div>

      <div className="w-full flex justify-between items-end gap-2 p-2">
        <div className="h-full flex flex-col justify-start gap-1">
          <Large>{content.name}</Large>
          <Small className="text-ellipsis line-clamp-3">
            {content.description}
          </Small>
          <p>{content.price} €</p>
        </div>

        <Button size="icon" className="shrink-0">
          <Plus />
        </Button>
      </div>
    </Card>
  );
}
