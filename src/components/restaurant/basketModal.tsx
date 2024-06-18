import { currentOrderContext } from "@/contexts/currentOrderContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { PartyPopper, ShoppingBasket } from "lucide-react";
import { H1, H2 } from "../typography";
import { Separator } from "../ui/separator";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosConfig";
import { CreateOrder, Order } from "@/entities/order";
import { useNavigate } from "@tanstack/react-router";
import { BasketSummary } from "../basket/basketSummary";
import { BasketAddressDisplay } from "../basket/basketAddressDisplay";
import { AddressInput, AddressInputType } from "../address/addressInput";

interface BasketModalProps extends React.HTMLProps<HTMLDivElement> {}

export function BasketModal({ ...props }: BasketModalProps) {
  const currentOrder = useContext(currentOrderContext);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<AddressInputType>({
    address: currentOrder.address,
    city: currentOrder.city,
    postal_code: currentOrder.postal_code,
    label: "",
  });

  const navigate = useNavigate({ from: "/restaurant/$id" });

  const mutation = useMutation({
    mutationFn: (currentOrder: CreateOrder) => {
      return axiosInstance.post("/order", currentOrder);
    },
    onSuccess(data, variables, context) {
      console.log("success", data);
      const res = data.data as Order;
      navigate({
        to: "/delivery/$order_id",
        params: {
          order_id: res.id_order,
        },
      });
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen} {...props} modal={true}>
      <DialogTrigger className="sticky mx-auto bottom-10 w-full z-50 ">
        {!open && (
          <Button
            size="lg"
            className="w-1/2 gap-2 shadow"
            onClick={() => {
              console.log("currentOrder", currentOrder);
            }}
          >
            Voir le panier
            <ShoppingBasket />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="space-y-4">
          <H1>Votre panier</H1>
          <div>
            <H2>Adresse de livraison</H2>
            {currentOrder.address ? (
              <BasketAddressDisplay {...currentOrder} />
            ) : (
              <div className="flex flex-col items-end gap-4">
                <AddressInput
                  className="w-full"
                  address={address}
                  onAddressChange={setAddress}
                />
                <Button
                  onClick={() => {
                    currentOrder.setAddress(address);
                  }}
                >
                  Valider l'adresse
                </Button>
              </div>
            )}
          </div>
          <Separator />

          <H2>Contenu du panier</H2>
          <BasketSummary
            editable
            totalPrice={currentOrder.calculateTotalPrice()}
            productMinus={(product) => {
              currentOrder.removeProduct(product);
            }}
            productAdd={(product) => {
              currentOrder.addProduct(product, 1);
            }}
            menuRemove={(menu) => {
              currentOrder.removeMenu(menu);
            }}
            menuAdd={(menu) => {
              currentOrder.addMenu(menu);
            }}
            menus={currentOrder.menus}
            products={currentOrder.products}
          />
        </DialogHeader>
        <Separator />

        <div className="flex justify-center items-center gap-4">
          <DialogClose>
            <Button variant="link" onClick={close}>
              Retour au menu
            </Button>
          </DialogClose>

          <Button
            className="gap-2"
            onClick={() => {
              if (currentOrder.address === "") return;

              mutation.mutate(currentOrder);
              currentOrder.clearOrder();
            }}
          >
            Valider la commande <PartyPopper />
          </Button>
        </div>
        {mutation.error && (
          <div className="flex justify-center items-center gap-4">
            <div className="text-red-500">
              {mutation.error.response?.data.message}
            </div>
          </div>
        )}
        {currentOrder.address === "" && (
          <div className="flex justify-center items-center gap-4">
            <div className="text-red-500">
              Veuillez saisir une adresse de livraison
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
