import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { Menu } from "@/entities/menu";
import { H1, H2 } from "../typography";
import { Separator } from "../ui/separator";

interface MenuConfigModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  close: () => void;
  content: Menu;
}

const productCategoryAggreation = (products: Menu["products"]) => {
  //create a new list of categories given the products list
  const categories = [];
  products.forEach((product) => {
    categories.push({
        name:product.category,
    });
  });
  return Array.from(categories);
};

export function MenuConfigModal({
  open,
  close,
  content,
  ...props
}: MenuConfigModalProps) {
  const categories = productCategoryAggreation(content.products);
  console.log(categories);

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        console.log(e);
        close();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <H2>{content.name}</H2>
          </DialogTitle>
          <div className="flex gap-2">
            <div>{content.description}</div>
            <div>{content.price}</div>
          </div>
          <Separator />
          <div>
            {content.products.map((product) => (
              <div key={product.id_product}>
                <H1>{product.name}</H1>
                <div>{product.description}</div>
                <div>{product.price}</div>
              </div>
            ))}
          </div>
          <DialogFooter>{content.price}</DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
