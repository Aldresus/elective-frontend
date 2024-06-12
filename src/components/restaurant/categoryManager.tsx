import { GripVertical, Plus } from "lucide-react";
import { H3 } from "../typography";
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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";

interface Items {
  name: string;
  id: string;
}

const itemsData: Array<Items> = [
  { name: "Produit 1", id: "1" },
  { name: "Produit 2", id: "2" },
  { name: "Produit 3", id: "3" },
  { name: "Produit 4", id: "4" },
  { name: "Menu 1", id: "5" },
  { name: "Menu 2", id: "6" },
  { name: "Menu 3", id: "7" },
  { name: "Menu 4", id: "8" },
];

interface ICategoryManager {
  category_name: string;
  category_id: string;
  items: Items[];
}

const SortableItem = ({ id, name }: Items) => {
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
  const [items, setItems] = useState<{ name: string; id: string }[]>(
    category.items
  );
  const [active, setActive] = useState<Active | null>(null);
  const [feedbackSelect, setfeedbackSelect] = useState<string | null>(null);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

  function addItem(newId: string) {
    const checkValue = items.find((item) => {
      return item.id === newId ? true : false;
    });
    if (!checkValue) {
      const newItem = itemsData.find((item) => {
        return item.id === newId;
      });
      setItems([
        ...items,
        {
          name: newItem.name,
          id: newId,
        },
      ]);
      setfeedbackSelect("Item ajouté");
    } else {
      setfeedbackSelect("Item déjà dans la catégorie");
    }
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between items-center pt-2">
        <H3>{category.category_name}</H3>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => {
          setActive(active);
        }}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over?.id) {
            const activeIndex = items.findIndex(({ id }) => id === active.id);
            const overIndex = items.findIndex(({ id }) => id === over.id);

            setItems(arrayMove(items, activeIndex, overIndex));
          }
          setActive(null);
        }}
        onDragCancel={() => {
          setActive(null);
        }}
      >
        <SortableContext items={items.map((product) => product.id)}>
          {items.map((product) => (
            <div key={product.id} className="w-full flex justify-start">
              <SortableItem
                key={product.id}
                id={product.id}
                name={product.name}
              />
            </div>
          ))}
        </SortableContext>
      </DndContext>
      <div className="w-2/3">
        <Select value="" onValueChange={addItem}>
          <SelectTrigger>
            <Plus className="text-accent" />
            <SelectValue placeholder="Ajouter Item" />
          </SelectTrigger>
          <SelectContent>
            {itemsData.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p>{feedbackSelect}</p>
      </div>
    </div>
  );
}
