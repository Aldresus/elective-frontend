import { useState } from "react";
import { Large } from "../typography";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";

export default function Command() {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center">
      <Card
        className="w-full flex items-stretch bg-card rounded-[10px] py-2 px-4"
        onClick={() => setIsDetailOpen(!isDetailOpen)}
      >
        <div className="flex flex-col w-3/5">
          <Large className="flex">Client name</Large>
          <Large className="flex">Nom livreur</Large>
          <p className="flex">14/06/2024</p>
        </div>
        <div className="flex flex-1 flex-col justify-around">
          <p className="flex">En cours</p>
          <p className="flex">35.45€</p>
        </div>
        <div className="flex flex-col justify-around">
          {!isDetailOpen && <ChevronRight />}
          {isDetailOpen && <ChevronDown />}
        </div>
      </Card>

      {isDetailOpen && (
        <Card className="w-[90%] px-4 py-2 rounded-none rounded-b-[10px] bg-slate-50">
          <Large>Detail commande</Large>
          <p>Produit 1</p>
          <p>Produit 2</p>
          <p>Menu 1</p>
        </Card>
      )}
    </div>
  );
}
