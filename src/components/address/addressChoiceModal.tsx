import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { H1 } from "../typography";
import { currentOrderContext } from "@/contexts/currentOrderContext";
import { AddressInput } from "./addressInput";
import { toast } from "sonner";
import { Map } from "lucide-react";

interface AddressChoiceModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  closed: () => void;
  opened: () => void;
}

export function AddressChoiceModal({
  open,
  closed,
  opened,
  ...props
}: AddressChoiceModalProps) {
  const [address, setAddress] = useState({
    address: "",
    city: "",
    postal_code: "",
    label: "",
  });

  const currentOrder = useContext(currentOrderContext);

  useEffect(() => {
    console.log("load address", currentOrder);

    setAddress({
      address: currentOrder.address,
      city: currentOrder.city,
      postal_code: currentOrder.postal_code,
      label: `${currentOrder.address} ${currentOrder.city} ${currentOrder.postal_code}`,
    });
  }, [currentOrder]);

  console.log(open);

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        //allows to close the modal by clicking outside
        if (e) {
          opened();
          return;
        }
        closed();
      }}
      {...props}
    >
      <DialogTrigger
        onClick={() => {
          opened();
          console.log("open");
        }}
      >
        <Button variant="link" className="underline hidden sm:block">
          {currentOrder.address === ""
            ? "Entrez votre adresse de livraison"
            : `${currentOrder.address} ${currentOrder.city} ${currentOrder.postal_code}`}
        </Button>
        <Button variant="link" className="underline block sm:hidden">
          <Map />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4 z-[10000]">
        <DialogHeader>
          <H1>Adresse de livraison</H1>
        </DialogHeader>
        <DialogDescription>
          <AddressInput address={address} onAddressChange={setAddress} />
        </DialogDescription>
        <DialogFooter className="flex flex-row justify-center sm:justify-center">
          <Button variant="link" onClick={closed}>
            Annuler
          </Button>
          <Button
            onClick={() => {
              console.log("address", address);

              if (
                address.address === "" ||
                address.city === "" ||
                address.postal_code === ""
              )
                return;

              currentOrder.setAddress(address);
              toast.success("Adresse de livraison modifiée");

              closed();
            }}
          >
            Modifier l'adresse
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
