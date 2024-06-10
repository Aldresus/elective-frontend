import CategoryManager from "@/components/restaurant/categoryManager";
import { H1, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";

interface ICategoryManager {
  category_name: string;
  product: { name: string; id: string }[];
}

const testData: Array<ICategoryManager> = [
  {
    category_name: "Category 1",
    product: [
      { name: "Produit 1", id: "1" },
      { name: "Produit 2", id: "2" },
      { name: "Produit 3", id: "3" },
    ],
  },
  {
    category_name: "Category 2",
    product: [
      { name: "Produit 2", id: "1" },
      { name: "Produit 3", id: "2" },
    ],
  },
  {
    category_name: "Category 3",
    product: [
      { name: "Produit 1", id: "1" },
      { name: "Produit 3", id: "2" },
    ],
  },
];

export const Route = createFileRoute("/_restaurant/menu-manager")({
  component: MenuManager,
});

function MenuManager() {
  return (
    <div className="h-full w-full">
      <H1>Menu Manager</H1>
      <div className="h-full w-full flex flex-col gap-4 pb-28 overflow-auto">
        <div className="flex flex-col gap-4 mt-2">
          <div>
            <Large>Menu Name</Large>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              className="w-full"
            />
          </div>
          <div>
            <Large>Menu Description</Large>
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
          <>
            <Separator />
            <CategoryManager {...testDataItem} />
          </>
        ))}
        <Button className="w-full flex gap-1">
          <Save />
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
