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

export function MenuConfigModal({
  open,
  close,
  content,
  ...props
}: MenuConfigModalProps) {
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
            {/* {content.products.map((product) => (
              <div key={product.id_product}>
                <H1>{product.name}</H1>
                <div>{product.description}</div>
                <div>{product.price}</div>
              </div>
            ))} */}
          </div>
          <DialogFooter>{content.price}</DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
