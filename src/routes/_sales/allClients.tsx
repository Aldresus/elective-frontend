import SearchBar from "@/components/common/searchBar";
import { H1, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Client } from "@/entities/client";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_sales/allClients")({
  component: AllClient,
});

function AllClient() {
  const alphabetList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const { token } = useAuth();
  const query = useQuery({
    queryKey: ["allClients"],
    queryFn: async () => {
      const response = await axiosInstance(token).get(`/user/?role=CLIENT`);
      // console.log(response.data);
      let finalData = response.data as Array<Client>;

      console.log(finalData);

      return finalData;
    },
  });

  return (
    <div className="h-full pb-16 overflow-auto">
      <H1>Clients</H1>
      <SearchBar />
      {alphabetList.map((letter) => (
        <div key={letter}>
          <Large>{letter}-</Large>
          {query.data
            ?.filter(function (el) {
              if (
                el.last_name.startsWith(letter) ||
                el.last_name.startsWith(letter.toLowerCase())
              ) {
                return true;
              }
            })
            .map((client) => (
              <Link to={`/clientDetails/${client.id}`} key={client.id}>
                <Button
                  className="w-full flex gap-1 justify-between"
                  variant="outline"
                  id={client.id}
                >
                  {client.last_name} {client.first_name}
                  <ChevronRight />
                </Button>
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
}
