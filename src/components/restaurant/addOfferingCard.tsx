import { Plus } from "lucide-react";
import { Large } from "../typography";
import { Card } from "../ui/card";
import { Link } from "@tanstack/react-router";

interface AddOfferingCardProps extends React.HTMLProps<HTMLDivElement> {
  type: "menu" | "produit";
}

export default function AddOfferingCard({
  type,
  ...props
}: AddOfferingCardProps) {
  return (
    <Link to={type === "produit" ? "/product/new" : "/menu/new"}>
      {
        //todo dynamik to={type === "produit" ? "/editProduct/id" : "/editMenu/id"}
      }
      <Card
        className="flex flex-col items-center justify-center py-4"
        {...props}
      >
        <Plus />
        <Large>Ajouter un {type}</Large>
      </Card>
    </Link>
  );
}
