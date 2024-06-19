import clsx from "clsx";
import { Label } from "../ui/label";
import { AddressSuggestion } from "../user/addressSuggestion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FeatureCollection } from "@/entities/featureCollection";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";

export interface AddressInputType {
  address: string;
  city: string;
  postal_code: string;
  label: string;
}

interface AddressInputProps extends React.HTMLAttributes<HTMLDivElement> {
  address: AddressInputType;
  onAddressChange: (address: AddressInputType) => void;
}

export function AddressInput({
  address,
  onAddressChange,
  className,
  ...props
}: AddressInputProps) {
  const [addressState, setAddressState] = useState(address || {});
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();

  const query = useQuery({
    queryKey: ["address", address],
    queryFn: async () => {
      const response = await axios.get(
        `https://api-adresse.data.gouv.fr/search/`,
        {
          params: {
            q: addressState.label,
            limit: "5",
          },
        }
      );
      console.log(response.data);

      return response.data as FeatureCollection;
    },
    enabled: false,
  });

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("addressChangeHandler", e.target.value);

    setAddressState((prev) => {
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

  return (
    <div className={cn(className)} {...props}>
      <Label>Adresse</Label>
      <div className="relative">
        <Input
          value={addressState.label}
          onChange={(e) => addressChangeHandler(e)}
          id="address"
          autoComplete="address-line1"
          className={clsx({
            "border-b-0 rounded-b-none": query.data?.features.length > 0,
          })}
        />

        <Search className="absolute right-2 top-2 " />
        <div className="relative w-full h-0 ">
          {query.isSuccess && (
            <div className="absolute flex flex-col w-full px-3 rounded-b  bg-secondary gap-2">
              {query.data?.features.map((feature) => (
                <AddressSuggestion
                  onSuggestionClick={(feature) => {
                    const newAddress = {
                      address: feature.properties.name,
                      city: feature.properties.city,
                      postal_code: feature.properties.postcode,
                      label: feature.properties.label,
                    };

                    setAddressState(newAddress);
                    onAddressChange(newAddress);
                  }}
                  feature={feature}
                  key={feature.properties.id}
                />
              ))}

              {query.data?.features.length === 0 && (
                <p>Aucune adresse trouvée</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
