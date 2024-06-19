import { Plus } from "lucide-react";
import { Large } from "../typography";
import { Card } from "../ui/card";
import { Link } from "@tanstack/react-router";

interface AddOfferingCardProps {
  type: "menu" | "produit";
}

export default function AddOfferingCard({ type }: AddOfferingCardProps) {
  return (
    <Link to={type === "produit" ? "/createProduct" : "/createMenu"}>
      {
        //todo dynamik to={type === "produit" ? "/editProduct/id" : "/editMenu/id"}
      }
      <Card className="flex flex-col items-center justify-center py-4">
        <Plus />
        <Large>Ajouter un {type}</Large>
      </Card>
    </Link>
  );
}
