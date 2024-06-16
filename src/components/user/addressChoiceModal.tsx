import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FeatureCollection } from "@/entities/featureCollection";
import { Timeout } from "node_modules/@tanstack/react-router/dist/esm/utils";
import { AddressSuggestion } from "./addressSuggestion";
import { EyeOff, Search } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { H1 } from "../typography";

interface AddressChoiceModalProps extends React.HTMLAttributes<HTMLDivElement> {
  currentAddress: string;
  open: boolean;
  closed: () => void;
  opened: () => void;
}

export function AddressChoiceModal({
  currentAddress,
  open,
  closed,
  opened,
  ...props
}: AddressChoiceModalProps) {
  const [address, setAddress] = useState("");
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();

  const query = useQuery({
    queryKey: ["address", address],
    queryFn: async () => {
      const response = await axios.get(
        `https://api-adresse.data.gouv.fr/search/`,
        {
          params: {
            q: address,
            limit: "1",
          },
        }
      );
      console.log(response.data);

      return response.data as FeatureCollection;
    },
    enabled: false,
  });

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);

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
        {currentAddress}
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <H1>Adresse de livraison</H1>
        </DialogHeader>
        <DialogDescription>
          <Label>Adresse</Label>
          <div className="relative">
            <Input
              value={address}
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
                    onClick={(e) => setAddress(e)}
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
          <Button onClick={closed}>Modifier l'adresse</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
