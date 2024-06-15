import { Plus } from "lucide-react";
import { Large, Small } from "../typography";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ProductCardProps } from "./props/productCardProps";
import { MenuConfigModal } from "./menuConfigModal";
import { isMenu, isProduct } from "@/entities/categoryContent";
import { useState } from "react";

export function VerticalProductCard({
  className,
  title,
  content,
  ...props
}: ProductCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {isMenu(content) && (
        <MenuConfigModal
          content={content}
          open={open}
          close={() => {
            setOpen(false);
          }}
        />
      )}
      <Card
        onClick={() => setOpen(true)}
        className="w-[200px] aspect-[5/8] bg-card shadow-none border-none cursor-pointer"
        {...props}
      >
        <div className="w-full aspect-square">
          <div className="object-fill h-full w-full ">
            <img
              src={
                isProduct(content)
                  ? content.product_image_url
                  : content.menu_image_url
              }
              alt="restaurant"
              className="relative h-full w-full object-cover rounded-t-md"
            />
          </div>
        </div>

        <div className="h-1/3 flex justify-between items-end gap-2 px-2 pt-1">
          <div className="h-full flex flex-col justify-start gap-1">
            <Large>{content.name}</Large>
            <Small className="text-ellipsis line-clamp-3 text-wrap">
              {content.description}
            </Small>
            <p>{content.price} €</p>
          </div>

          <Button size="icon" className="shrink-0">
            <Plus />
          </Button>
        </div>
      </Card>
    </>
  );
}
