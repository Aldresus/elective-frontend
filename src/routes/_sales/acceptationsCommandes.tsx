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
          value1="Le Gourmet Épicurien"
          value2="Leroy Arthur"
          orderId="ddgcsc80y8s1pnntg6loq0ol"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptCom"
          value1="La Table des Délices"
          value2="Bernard Léa"
          orderId="vy5xb531rh4ncvzlxphpdmsj"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptCom"
          value1="Bistro de la Gare"
          value2="Moreau Juliette"
          orderId="j5gfp2fqac0uep62ba0dwg87"
          date="15/05/2024"
        />
        <SalesDataCard
          type="acceptCom"
          value1="L'Auberge du Rhin"
          value2="Martin Thomas"
          orderId="ro2fdyvxddaefg0kteeposoc"
          date="15/05/2024"
        />
      </div>
    </div>
  );
}
