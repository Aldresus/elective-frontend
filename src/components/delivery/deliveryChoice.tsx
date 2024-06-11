import { Check, X } from "lucide-react";
import { H3, Large } from "../typography";

export default function DeliveryChoice() {
  return (
    <div className="py-3 px-6 rounded-[20px] bg-slate-100">
      <div className="flex justify-between items-center mb-2">
        <H3>Restaurant (pickup)</H3>
        <Large>30.56€</Large>
      </div>
      <div className="flex justify-around items-center gap-2">
        <div className="flex-1">
          <p>Adresse livraison</p>
          <p>Adresse livraison</p>
        </div>
        <div className="px-3">
          <Check />
        </div>
        <div className="px-3 pr-0">
          <X />
        </div>
      </div>
    </div>
  );
}
