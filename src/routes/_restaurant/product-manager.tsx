import { H1, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";

export const Route = createFileRoute("/_restaurant/product-manager")({
  component: ProductManager,
});

function ProductManager() {
  return (
    <div className="h-full w-full">
      <H1>Product Manager</H1>
      <div className="h-full w-full flex flex-col justify-between pb-28">
        <div className="flex flex-col gap-4 mt-2">
          <div>
            <Large>Product Name</Large>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              className="w-full"
            />
          </div>
          <div>
            <Large>Product Description</Large>
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
        <Button className="w-full flex gap-1">
          <Save />
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
