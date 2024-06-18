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
import { H1, H2, Large, Small } from "../typography";
import { Separator } from "../ui/separator";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosConfig";
import { CreateOrder, Order } from "@/entities/order";
import { useNavigate } from "@tanstack/react-router";
import { BasketProductElement } from "../basket/basketProductElement";
import { BasketMenuElement } from "../basket/basketMenuElement";
import { BasketSummary } from "../basket/basketSummary";
import { BasketAddressDisplay } from "../basket/basketAddressDisplay";

interface BasketModalProps extends React.HTMLProps<HTMLDivElement> {}

export default function BasketModal({ ...props }: BasketModalProps) {
  const currentOrder = useContext(currentOrderContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate({ from: "/restaurant/$id" });

  const mutation = useMutation({
    mutationFn: (currentOrder: CreateOrder) => {
      return axiosInstance.post("/order", currentOrder);
    },
    onSuccess(data, variables, context) {
      console.log("success", data);
      const res = data.data as Order;
      // redirect({
      //   to: "/order/$id",
      //   params: {
      //     id: res.id_order,
      //   },
      // });
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
            <BasketAddressDisplay {...currentOrder} />
          </div>
          <Separator />

          <H2>Contenu du panier</H2>
          <BasketSummary
            totalPrice={currentOrder.calculateTotalPrice()}
            {...currentOrder}
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
              mutation.mutate(currentOrder);
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
      </DialogContent>
    </Dialog>
  );
}
