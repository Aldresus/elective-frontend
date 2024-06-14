import Command from "@/components/restaurant/command";
import { H1, H2, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_restaurateur/commandMonitoring")({
  component: CommandMonitoring,
});

function CommandMonitoring() {
  return (
    <div className="flex flex-col w-full h-full overflow-auto pb-16 gap-3">
      <div className="w-full">
        <H1 className="w-full pb-2">Gestion des commandes</H1>
        <div className="w-full flex">
          <Input className="flex-1" placeholder="Rechercher" />
          <Button variant="ghost">
            <Search />
          </Button>
        </div>
      </div>
      <div>
        <H2 className="p-0">En cours</H2>
        <div className="flex flex-col gap-3">
          <Command />
          <Command />
          <Command />
        </div>
      </div>

      <div>
        <H2 className="p-0">Terminées</H2>
        <div className="flex flex-col gap-3">
          <Command />
          <Command />
          <Command />
        </div>
      </div>
    </div>
  );
}
