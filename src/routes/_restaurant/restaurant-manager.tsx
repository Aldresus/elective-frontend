import CategoryManager from "@/components/restaurant/categoryManager";
import { H1, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Save } from "lucide-react";

export const Route = createFileRoute("/_restaurant/restaurant-manager")({
  component: RestaurantManager,
});

interface Items {
  name: string;
  id: string;
}

interface ICategoryManager {
  category_name: string;
  category_id: string;
  items: Items[];
}

const testData: Array<ICategoryManager> = [
  {
    category_name: "Category 1",
    category_id: "1",
    items: [
      { name: "Produit 1", id: "1" },
      { name: "Menu 1", id: "5" },
      { name: "Produit 3", id: "3" },
    ],
  },
  {
    category_name: "Category 2",
    category_id: "2",
    items: [
      { name: "Produit 2", id: "2" },
      { name: "Menu 2", id: "6" },
    ],
  },
  {
    category_name: "Category 3",
    category_id: "3",
    items: [
      { name: "Produit 1", id: "1" },
      { name: "Menu 4", id: "8" },
    ],
  },
];

function RestaurantManager() {
  return (
    <div className="h-full w-full">
      <H1 className="pb-2">Restaurant Manager</H1>
      <div className="h-full w-full flex flex-col gap-4 pb-40 overflow-auto">
        <div className="flex flex-col gap-4 mt-2">
          <div>
            <Large>Restaurant Name</Large>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              className="w-full"
            />
          </div>
          <div>
            <Large>SIRET</Large>
            <Input
              id="siret"
              type="text"
              placeholder="SIRET"
              className="w-full"
            />
          </div>
          <div>
            <Large>Restaurant Description</Large>
            <Textarea id="textarea" placeholder="Description" />
          </div>
          <div>
            <Large>Image</Large>
            <Input
              id="file"
              type="file"
              accept="image/png, image/jpeg"
              placeholder="Select an image"
            />
          </div>
          <div>
            <Large>Price</Large>
            <Input id="price" type="number" placeholder="Price (€)" />
          </div>
        </div>
        {testData.map((testDataItem) => (
          <div key={testDataItem.category_id}>
            <Separator />
            <CategoryManager {...testDataItem} />
          </div>
        ))}
        <Button className="w-full flex gap-1" variant="outline">
          <Plus />
          Add Category
        </Button>

        <Button className="w-full flex gap-1 h-64">
          <Save />
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
