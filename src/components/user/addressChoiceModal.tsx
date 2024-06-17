import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FeatureCollection } from "@/entities/featureCollection";
import { AddressSuggestion } from "./addressSuggestion";
import { Search } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { H1 } from "../typography";
import { currentOrderContext } from "@/contexts/currentOrderContext";
import { set } from "react-hook-form";

interface AddressChoiceModalProps extends React.HTMLAttributes<HTMLDivElement> {
  currentAddress: string;
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
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();

  const query = useQuery({
    queryKey: ["address", address],
    queryFn: async () => {
      const response = await axios.get(
        `https://api-adresse.data.gouv.fr/search/`,
        {
          params: {
            q: address.label,
            limit: "5",
          },
        }
      );
      console.log(response.data);

      return response.data as FeatureCollection;
    },
    enabled: false,
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

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("addressChangeHandler", e.target.value);

    setAddress((prev) => {
      return {
        ...prev,
        label: e.target.value,
      };
    });

    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    setCurrentTimeout(
      setTimeout(() => {
        query.refetch();
      }, 200)
    );
  };

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
    >
      <DialogTrigger
        onClick={() => {
          opened();
          console.log("open");
        }}
      >
        {currentOrder.address === ""
          ? "Adresse de livraison"
          : `${currentOrder.address} ${currentOrder.city} ${currentOrder.postal_code}`}
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <H1>Adresse de livraison</H1>
        </DialogHeader>
        <DialogDescription>
          <Label>Adresse</Label>
          <div className="relative">
            <Input
              value={address.label}
              onChange={(e) => addressChangeHandler(e)}
              id="address"
              autoComplete="address-line1"
              className={clsx({
                "border-b-0 rounded-b-none": query.data?.features.length > 0,
              })}
            />
            <Search className="absolute right-2 top-2 " />
            <div className="relative w-full h-0 ">
              <div className="absolute flex flex-col w-full px-3 rounded-b  bg-secondary gap-2">
                {query.data?.features.map((feature) => (
                  <AddressSuggestion
                    onClick={(feature) => {
                      setAddress({
                        address: feature.properties.name,
                        city: feature.properties.city,
                        postal_code: feature.properties.postcode,
                        label: feature.properties.label,
                      });
                    }}
                    feature={feature}
                    key={feature.properties.id}
                  />
                ))}

                {query.data?.features.length === 0 && (
                  <p>Aucune adresse trouvée</p>
                )}
              </div>
            </div>

            {/* <div>{address}</div> */}
          </div>
        </DialogDescription>
        <DialogFooter className="flex flex-row justify-center sm:justify-center">
          <Button variant="link" onClick={closed}>
            Annuler
          </Button>
          <Button
            onClick={() => {
              console.log("address", address);

              if (address.address === "") return;

              currentOrder.setAddress(address);

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
