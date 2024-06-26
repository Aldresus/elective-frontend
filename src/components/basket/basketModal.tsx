import { currentOrderContext } from "@/contexts/currentOrderContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PartyPopper, ShoppingBasket } from "lucide-react";
import { H1, H2 } from "../typography";
import { Separator } from "../ui/separator";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosConfig";
import { CreateOrder, Order } from "@/entities/order";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { BasketSummary } from "./basketSummary";
import { BasketAddressDisplay } from "./basketAddressDisplay";
import { AddressInput, AddressInputType } from "../address/addressInput";
import { useLocalStorage } from "@uidotdev/usehooks";
import { DecodedAccessToken } from "@/entities/login";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

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
  const router = useRouterState();

  const navigate = useNavigate({ from: router.location.pathname });

  console.log("path", router.location.pathname);

  const [decodedAccessToken] = useLocalStorage<DecodedAccessToken>("user");

  const { token } = useAuth();

  useEffect(() => {
    if (decodedAccessToken?.sub !== currentOrder.id_user) {
      currentOrder.setUserId(decodedAccessToken?.sub);
    }
  }, [decodedAccessToken, currentOrder]);

  const mutation = useMutation({
    mutationFn: (currentOrder: CreateOrder) => {
      return axiosInstance(token).post("/order", currentOrder);
    },
    onSuccess(data) {
      console.log("success", data);
      const res = data.data as Order;
      currentOrder.clearOrder();
      navigate({
        to: "/delivery/$order_id",
        params: {
          order_id: res.id_order,
        },
      });
      toast.success("Commande créée !");
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
          {decodedAccessToken?.sub === currentOrder.id_user ? (
            <Button
              className="gap-2"
              onClick={() => {
                if (currentOrder.address === "") return;

                mutation.mutate(currentOrder);
              }}
            >
              Valider la commande <PartyPopper />
            </Button>
          ) : (
            <Button
              className="gap-2"
              onClick={() => {
                navigate({
                  to: "/login",
                  search: {
                    redirect: router.location.pathname,
                  },
                });
              }}
            >
              Connectez-vous pour continuer
            </Button>
          )}
        </div>
        {mutation.error && (
          <div className="flex justify-center items-center gap-4">
            <div className="text-red-500">{mutation.error.message}</div>
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
