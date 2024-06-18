import { useContext, useState } from "react";
import { HorizontalItemCard } from "../primitives/horizontalItemCard";
import { Product } from "@/entities/product";
import { ProductConfigModal } from "./productConfigModal";
import { cn } from "@/lib/utils";
import { currentOrderContext } from "@/contexts/currentOrderContext";
import { productToOrderProduct } from "@/entities/order";

interface HorizontalProductCardProps extends React.HTMLProps<HTMLDivElement> {
  product: Product;
}

export function HorizontalProductCard({
  className,
  product,
  ...props
}: HorizontalProductCardProps) {
  const [open, setOpen] = useState(false);
  const currentOrder = useContext(currentOrderContext);

  return (
    <>
      <ProductConfigModal
        product={product}
        open={open}
        close={() => {
          setOpen(false);
        }}
      />
      <HorizontalItemCard
        onClick={() => setOpen(true)}
        onAddClick={(e) => {
          e.stopPropagation();
          console.log("add product", product);
          currentOrder.addProduct(productToOrderProduct(product), 1);
        }}
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
