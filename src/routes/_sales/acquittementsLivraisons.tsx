import SearchBar from "@/components/common/searchBar";
import SalesDataCard from "@/components/sales/salesDataCard";
import { H1 } from "@/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_sales/acquittementsLivraisons")({
  component: AcquittementsLivraisons,
});

function AcquittementsLivraisons() {
  return (
    <div className="w-full flex flex-col gap-3 h-full">
      <div>
        <H1>Acquittements des livraisons</H1>
        <p>Lorsqu'un livreur transmet la commande au client.</p>
      </div>
      <SearchBar />
      <div className="h-full flex flex-col gap-2 overflow-auto pb-20">
        <SalesDataCard
          type="acquittement"
          value1="le livreur lo"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acquittement"
          value1="le livreur lo"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acquittement"
          value1="le livreur lo"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acquittement"
          value1="le livreur lo"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acquittement"
          value1="le livreur lo"
          value2="le client lo"
          orderId="452158877féf"
          date="15/05/2024"
        />
      </div>
    </div>
  );
}
