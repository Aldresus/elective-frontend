import { Plus } from "lucide-react";
import { Large } from "../typography";
import { Card } from "../ui/card";
import { Link } from "@tanstack/react-router";

interface AddOfferingCardProps {
  type: string;
}

export default function AddOfferingCard({ type }: AddOfferingCardProps) {
  return (
    <Link to={type === "produit" ? "/product-manager" : "/menu-manager"}>
      <Card className="flex flex-col items-center justify-center py-4">
        <Plus />
        <Large>Ajouter un {type}</Large>
      </Card>
    </Link>
  );
}
