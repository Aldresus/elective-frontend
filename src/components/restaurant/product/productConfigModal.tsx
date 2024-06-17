import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { H1, H2, Large, Small } from "../../typography";
import { Product } from "@/entities/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { currentOrderContext } from "@/contexts/currentOrderContext";
import { productToOrderProduct } from "@/entities/order";

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

  const [selectedQuantity, setSelectedQuantity] = useState(1); //temp solution

  const currentOrder = useContext(currentOrderContext);

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
          <DialogHeader className="space-y-4">
            <H1>{product.name}</H1>

            <div className="flex justify-between">
              <p>{product.description}</p>
              <Large>{product.price} €</Large>
            </div>
          </DialogHeader>
        </div>
        <DialogFooter className="sm:justify-center p-6">
          <div className="space-y-4">
            <div className="flex justify-center items-center gap-4">
              <Label>Quantité</Label>
              <Input
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                type="number"
                min={1}
                max={50}
                className="w-16"
              />
            </div>
            <Button variant="link" onClick={close}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                currentOrder.addProduct(
                  productToOrderProduct(product),
                  selectedQuantity
                );
                close();
              }}
            >
              <p>
                Ajouter pour <Small>{product.price * selectedQuantity}€</Small>
              </p>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
