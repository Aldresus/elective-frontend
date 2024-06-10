import { GripVertical, Plus } from "lucide-react";
import { H3 } from "../typography";
import { Button } from "../ui/button";

interface ICategoryManager {
  category_name: string;
  product: { name: string; id: string }[];
}

export default function CategoryManager(category: ICategoryManager) {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <H3>{category.category_name}</H3>
        <Button>
          <Plus />
          Ajouter Produit
        </Button>
      </div>
      {category.product.map((items) => (
        <div className="w-2/3 flex justify-start">
          <GripVertical />
          <p id={items.id}>{items.name}</p>
        </div>
      ))}
    </div>
  );
}
