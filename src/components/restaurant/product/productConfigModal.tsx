import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { H2 } from "../../typography";
import { Product } from "@/entities/product";

interface ProductConfigModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  close: () => void;
  product: Product;
}

export function ProductConfigModal({
  open,
  close,
  product,
  ...props
}: ProductConfigModalProps) {
  console.log(product);

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        console.log(e);
        close();
      }}
    >
      <DialogContent className="p-0 border-none">
        <div className="rounded-t-lg h-[200px] overflow-hidden object-fill">
          <img
            className="w-full h-full object-cover"
            src={product.product_image_url}
            alt={product.name}
          />
        </div>
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>
              <H2>{product.name}</H2>
            </DialogTitle>
            <div className="flex justify-between gap-2">
              <div>{product.description}</div>
              <div>{product.price} €</div>
            </div>
            <DialogFooter>{product.price}</DialogFooter>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
