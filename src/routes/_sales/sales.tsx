import { H1, H2, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_sales/sales")({
  component: Sales,
});

function Sales() {
  return (
    <div className="w-full flex flex-col gap-3">
      <H1>Bonjour Nom Prénom,</H1>
      <Button className="w-full flex gap-1 justify-between" variant="outline">
        Passations des commandes
        <ChevronRight />
      </Button>
      <Button className="w-full flex gap-1 justify-between" variant="outline">
        Acceptations des commandes
        <ChevronRight />
      </Button>
      <Button className="w-full flex gap-1 justify-between" variant="outline">
        Acceptation des livraisons
        <ChevronRight />
      </Button>
      <Button className="w-full flex gap-1 justify-between" variant="outline">
        Acquittelent des livraisons
        <ChevronRight />
      </Button>
      <Button className="w-full flex gap-1 justify-between" variant="outline">
        Clients
        <ChevronRight />
      </Button>
      <div>
        <Large>Chiffre d'affaire transactionnel global en cours :</Large>
        <div className="w-full flex justify-center">
          <div className="w-3/4 flex items-center justify-center py-4 bg-slate-200 rounded-[10px]">
            <H2>300,568,210.56€</H2>
          </div>
        </div>
      </div>
    </div>
  );
}
