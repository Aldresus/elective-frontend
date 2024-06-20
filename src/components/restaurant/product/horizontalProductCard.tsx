import { useContext, useState } from "react";
import { HorizontalItemCard } from "../primitives/horizontalItemCard";
import { Product } from "@/entities/product";
import { ProductConfigModal } from "./productConfigModal";
import { cn } from "@/lib/utils";
import { currentOrderContext } from "@/contexts/currentOrderContext";
import { productToOrderProduct } from "@/entities/order";
import { toast } from "sonner";

interface HorizontalProductCardProps extends React.HTMLProps<HTMLDivElement> {
  product: Product;
  addButton?: boolean;
}

export function HorizontalProductCard({
  className,
  product,
  addButton = true,
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
        addButton={addButton}
        onClick={() => setOpen(true)}
        onAddClick={(e) => {
          e.stopPropagation();
          console.log("add product", product);
          currentOrder.addProduct(productToOrderProduct(product), 1);
          toast.success(`1x ${product.name} ajouté à votre commande`);
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
