import { useState } from "react";
import { Product } from "@/entities/product";
import { ProductConfigModal } from "./productConfigModal";
import { VerticalItemCard } from "../primitives/verticalItemCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VerticalProductCardProps extends React.HTMLProps<HTMLDivElement> {
  product: Product;
}

export function VerticalProductCard({
  className,
  product,
  ...props
}: VerticalProductCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ProductConfigModal
        product={product}
        open={open}
        close={() => {
          setOpen(false);
        }}
      />

      <VerticalItemCard
        onClick={() => setOpen(true)}
        cardDescription={product.description}
        cardPrice={product.price}
        cardTitle={product.name}
        imgUrl={product.product_image_url}
        className={cn("cursor-pointer", className)}
        {...props}
      />
    </>
  );
}
