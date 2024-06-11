import WaitingCommandCard from "@/components/restaurant/waitingCommandCard";
import { H1, H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_restaurant/restaurant")({
  component: Restaurant,
});

function Restaurant() {
  return (
    <div className="w-full h-full">
      <H1>Nom du restaurant</H1>
      <H2>Commandes en attente</H2>
      <div className="h-full flex flex-col justify-between pb-40">
        <div className="h-[90%] flex flex-col gap-2 overflow-auto">
          <WaitingCommandCard />
          <WaitingCommandCard />
          <WaitingCommandCard />
          <WaitingCommandCard />
          <WaitingCommandCard />
          <WaitingCommandCard />
        </div>
        <Button className="w-full">Commandes en cours</Button>
      </div>
    </div>
  );
}
