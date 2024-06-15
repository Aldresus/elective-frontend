import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import type { FullMenu, Menu } from "@/entities/menu";
import { H1, H2, Large } from "../../typography";
import { Separator } from "../../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosConfig";
import { MenuCategoryProducts } from "./menuCategoryProducts";
import { Button } from "@/components/ui/button";

interface MenuConfigModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  close: () => void;
  menuContent: Menu;
  enableQuery?: boolean;
}

const queryFn = async (id_menu: string) => {
  const response = await axiosInstance.get(`/menu/${id_menu}`);
  console.log("menu details", response.data);

  return response.data as FullMenu;
};

export function MenuConfigModal({
  open,
  close,
  menuContent,
  enableQuery = true,
  ...props
}: MenuConfigModalProps) {
  console.log(menuContent);

  const query = useQuery({
    queryKey: ["menu", menuContent.id_menu],
    queryFn: () => queryFn(menuContent.id_menu),
    enabled: open && enableQuery,
  });

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
        <div className="p-6 pb-2 overflow-y-scroll max-h-[500px]">
          <DialogHeader>
            <H1>{menuContent.name}</H1>
            <div className="flex justify-between gap-2">
              <div>{menuContent.description}</div>
              <Large>{menuContent.price} €</Large>
            </div>
            <Separator />
            <div className="space-y-4">
              {query.data?.Menu_Categories.map((category) => (
                <MenuCategoryProducts
                  category={category}
                  key={category.id_category}
                />
              ))}
            </div>
            <DialogFooter className="relative">
              <Button variant="link" onClick={close}>
                Annuler
              </Button>
              <Button onClick={close}>Ajouter au panier</Button>
            </DialogFooter>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
