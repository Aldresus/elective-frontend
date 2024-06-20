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
          value1="Jean-Michel Dupont"
          value2="Leroy Arthur"
          orderId="ddgcsc80y8s1pnntg6loq0ol"
          date="19/05/2024"
        />
        <SalesDataCard
          type="acquittement"
          value1="Martin Emma"
          value2="Bernard Léa"
          orderId="vy5xb531rh4ncvzlxphpdmsj"
          date="18/05/2024"
        />
        <SalesDataCard
          type="acquittement"
          value1="Michel Nathan"
          value2="Moreau Juliette"
          orderId="j5gfp2fqac0uep62ba0dwg87"
          date="17/05/2024"
        />
        <SalesDataCard
          type="acquittement"
          value1="Lefebvre Lucie"
          value2="Martin Thomas"
          orderId="ro2fdyvxddaefg0kteeposoc"
          date="16/05/2024"
        />
      </div>
    </div>
  );
}
