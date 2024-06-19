import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchBar() {
  return (
    <div className="w-full flex">
      <Input className="flex-1" placeholder="Rechercher" />
      <Button variant="ghost">
        <Search />
      </Button>
    </div>
  );
}
