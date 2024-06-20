import SearchBar from "@/components/common/searchBar";
import SalesDataCard from "@/components/sales/salesDataCard";
import { H1 } from "@/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_sales/acceptationsLivraisons")({
  component: AcceptationsLivraisons,
});

function AcceptationsLivraisons() {
  return (
    <div className="w-full flex flex-col gap-3 h-full">
      <div>
        <H1>Acceptations livraisons</H1>
        <p>Lorsqu'un livreur accepte d'effectuer une livraison.</p>
      </div>
      <SearchBar />
      <div className="h-full flex flex-col gap-2 overflow-auto pb-20">
        <SalesDataCard
          type="acceptLiv"
          value1="le livreur lo"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptLiv"
          value1="le livreur lo"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptLiv"
          value1="le livreur lo"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptLiv"
          value1="le livreur lo"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptLiv"
          value1="le livreur lo"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
      </div>
    </div>
  );
}
