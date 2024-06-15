import SearchBar from "@/components/common/searchBar";
import SalesDataCard from "@/components/sales/salesDataCard";
import { H1 } from "@/components/typography";
import { Separator } from "@radix-ui/react-separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_sales/passationsCommandes")({
  component: PassationsCommandes,
});

function PassationsCommandes() {
  return (
    <div className="w-full flex flex-col gap-3 h-full">
      <div>
        <H1>Passations commandes</H1>
        <p>Lorsqu'un restaurant donne la commande au livreur.</p>
      </div>
      <SearchBar />
      <div className="h-full flex flex-col gap-2 overflow-auto pb-20">
        <SalesDataCard
          type="passation"
          value1="Kebabouche"
          value2="Jean-Michel"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="passation"
          value1="Kebabouche"
          value2="Jean-Michel"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="passation"
          value1="Kebabouche"
          value2="Jean-Michel"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="passation"
          value1="Kebabouche"
          value2="Jean-Michel"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="passation"
          value1="Kebabouche"
          value2="Jean-Michel"
          orderId="452158877féf"
          date="15/05/2024"
        />
      </div>
    </div>
  );
}
