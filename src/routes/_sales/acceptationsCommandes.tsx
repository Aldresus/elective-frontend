import SearchBar from "@/components/common/searchBar";
import SalesDataCard from "@/components/sales/salesDataCard";
import { H1 } from "@/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_sales/acceptationsCommandes")({
  component: AcceptationsCommandes,
});

function AcceptationsCommandes() {
  return (
    <div className="w-full flex flex-col gap-3 h-full">
      <div>
        <H1>Acceptations commandes</H1>
        <p>Lorsqu'un restaurant accepte de traiter une commande.</p>
      </div>
      <SearchBar />
      <div className="h-full flex flex-col gap-2 overflow-auto pb-20">
        <SalesDataCard
          type="acceptCom"
          value1="Kebabouche"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptCom"
          value1="Kebabouche"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptCom"
          value1="Kebabouche"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptCom"
          value1="Kebabouche"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptCom"
          value1="Kebabouche"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
      </div>
    </div>
  );
}
