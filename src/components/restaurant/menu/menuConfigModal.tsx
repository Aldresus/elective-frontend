import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import type { Menu } from "@/entities/menu";
import { H2 } from "../../typography";
import { Separator } from "../../ui/separator";

interface MenuConfigModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  close: () => void;
  menuContent: Menu;
}

export function MenuConfigModal({
  open,
  close,
  menuContent,
  ...props
}: MenuConfigModalProps) {
  console.log(menuContent);

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
            src={menuContent.menu_image_url}
            alt={menuContent.name}
          />
        </div>
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>
              <H2>{menuContent.name}</H2>
            </DialogTitle>
            <div className="flex justify-between gap-2">
              <div>{menuContent.description}</div>
              <div>{menuContent.price} €</div>
            </div>
            <Separator />
            {/* <div>
              {menuContent.products.map((product) => (
                <div key={product.id_product}>
                  <H1>{product.name}</H1>
                  <div>{product.description}</div>
                  <div>{product.price} €</div>
                </div>
              ))}
            </div> */}
            <DialogFooter>{menuContent.price}</DialogFooter>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
