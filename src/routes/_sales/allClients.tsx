import SearchBar from "@/components/common/searchBar";
import { H1, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Client } from "@/entities/client";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_sales/allClients")({
  component: AllClient,
});

function AllClient() {
  const alphabetList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  //todo: get token dynamikly
  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjZkOTk1NGNmOTY1ZDM0MGZjMGUyNmEiLCJ1c2VybmFtZSI6InNvcGhpYS5qb25lc0BleGFtcGxlLmNvbSIsInJvbGUiOiJDT01NRVJDSUFMIiwiaWF0IjoxNzE4NDgxNTY0LCJleHAiOjE3MTkzODE1NjR9.9U_4HSizx2BhJGVf1ByBdGwomvx0fQqTT9VRs_K5ODM`,
  };
  const query = useQuery({
    queryKey: ["allClients"],
    queryFn: async () => {
      const response = await axiosInstance().get(`/user/?role=CLIENT`, {
        headers,
      });
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
