import { GripVertical, Plus } from "lucide-react";
import { H3 } from "../typography";
import { Button } from "../ui/button";
import {
  Active,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { useState } from "react";

interface IProduct {
  name: string;
  id: string;
}

interface ICategoryManager {
  category_name: string;
  category_id: string;
  products: IProduct[];
}

const SortableItem = ({ id, name }: IProduct) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-2/3 flex justify-start items-center gap-2 p-2 border border-gray-300 rounded-md bg-white"
    >
      <GripVertical />
      <p>{name}</p>
    </div>
  );
};

export default function CategoryManager(category: ICategoryManager) {
  const [products, setProducts] = useState<{ name: string; id: string }[]>(
    category.products
  );
  const [active, setActive] = useState<Active | null>(null);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <H3>{category.category_name}</H3>
        <Button>
          <Plus />
          Ajouter Produit
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => {
          setActive(active);
        }}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over?.id) {
            const activeIndex = products.findIndex(
              ({ id }) => id === active.id
            );
            const overIndex = products.findIndex(({ id }) => id === over.id);

            setProducts(arrayMove(products, activeIndex, overIndex));
          }
          setActive(null);
        }}
        onDragCancel={() => {
          setActive(null);
        }}
      >
        <SortableContext items={products.map((product) => product.id)}>
          {products.map((product) => (
            <div key={product.id} className="w-2/3 flex justify-start">
              <SortableItem
                key={product.id}
                id={product.id}
                name={product.name}
              />
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
