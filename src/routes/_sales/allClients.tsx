import SearchBar from "@/components/common/searchBar";
import { H1, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_sales/allClients")({
  component: AllClient,
});

function AllClient() {
  const alphabetList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <div className="h-full pb-16 overflow-auto">
      <H1>Clients</H1>
      <SearchBar />
      {alphabetList.map((letter) => (
        <div>
          <Large>{letter}-</Large>
          <Button
            className="w-full flex gap-1 justify-between"
            variant="outline"
          >
            Client nom start with {letter}
            <ChevronRight />
          </Button>
        </div>
      ))}
    </div>
  );
}
