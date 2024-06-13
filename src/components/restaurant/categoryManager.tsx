import { GripVertical, Plus, Trash2 } from "lucide-react";
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
import {
  CategoryContent,
  getItemId,
  isMenu,
  isProduct,
} from "@/entities/categoryContent";
import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";

interface ItemRequiredValues {
  id: string;
  name: string;
}

interface SortableItemProps extends ItemRequiredValues {
  deleteItem: (id: string) => void;
}

const SortableItem = ({ id, name, deleteItem }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div className="w-full flex items-center gap-2">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="w-3/4 flex items-center gap-2 p-2 border border-gray-300 rounded-md bg-white"
      >
        <GripVertical />
        <p>{name}</p>
      </div>
      <Trash2 onClick={() => deleteItem(id)} className="text-destructive" />
    </div>
  );
};

interface CategoryManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  category: CategoryContent;
  allItemsList: (Menu | Product)[];
}

export default function CategoryManager({
  category,
  allItemsList,
}: CategoryManagerProps) {
  const [itemsList, setitemsList] = useState<(Menu | Product)[]>(allItemsList);
  const [items, setItems] = useState<(Menu | Product)[]>(category.items);
  const [active, setActive] = useState<Active | null>(null);
  const [feedbackSelect, setfeedbackSelect] = useState<string | null>(null);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

  function addItem(newId: string) {
    // Check if item is already in the category
    const checkValue = items.find((item) => {
      if (isProduct(item)) {
        return item.id_product === newId ? true : false;
      } else {
        return item.id_menu === newId ? true : false;
      }
    });

    // if item is not in the category, we add it, else do nothing
    if (!checkValue) {
      //get the item from the list with all items
      const newItem = itemsList.find((item) => {
        if (isProduct(item)) {
          return item.id_product === newId;
        } else {
          return item.id_menu === newId;
        }
      });
      // add it to the category list
      if (newItem !== undefined && isProduct(newItem)) {
        setItems([
          ...items,
          {
            id_product: newItem.id_product,
            name: newItem.name,
            price: newItem.price,
            description: newItem.description,
            product_image_url: newItem.product_image_url,
            category: newItem.category,
            id_restaurant: newItem.id_restaurant,
          },
        ]);
      } else if (newItem !== undefined && isMenu(newItem)) {
        setItems([
          ...items,
          {
            id_menu: newItem.id_menu,
            name: newItem.name,
            description: newItem.description,
            menu_image_url: newItem.menu_image_url,
            price: newItem.price,
            category: newItem.category,
            menu_ordered_categories: newItem.menu_ordered_categories,
            products: newItem.products,
          },
        ]);
      }
      setfeedbackSelect("Item ajouté");
    } else {
      setfeedbackSelect("Item déjà dans la catégorie");
    }
  }

  function deleteItem(id: string) {
    setItems(
      items.filter((item) => {
        if (isProduct(item)) {
          item.id_product !== id;
        } else {
          item.id_menu !== id;
        }
      })
    );
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
            const activeIndex = items.findIndex((item) => {
              if (isProduct(item)) {
                return item.id_product === active.id;
              } else {
                return item.id_menu === active.id;
              }
            });
            const overIndex = items.findIndex((item) => {
              if (isProduct(item)) {
                return item.id_product === over.id;
              } else {
                return item.id_menu === over.id;
              }
            });
            setItems(arrayMove(items, activeIndex, overIndex));
          }
          setActive(null);
        }}
        onDragCancel={() => {
          setActive(null);
        }}
      >
        <SortableContext
          items={items.map((item) => {
            return getItemId(item);
          })}
        >
          {items.map((item) => (
            <div key={getItemId(item)} className="w-full flex justify-start">
              <SortableItem
                id={getItemId(item)}
                name={item.name}
                deleteItem={deleteItem}
              />
            </div>
          ))}
        </SortableContext>
      </DndContext>
      <div className="w-3/4">
        <Select value="" onValueChange={addItem}>
          <SelectTrigger>
            <Plus className="text-accent" />
            <SelectValue placeholder="Ajouter Item" />
          </SelectTrigger>
          <SelectContent>
            {itemsList.map((item) => (
              <SelectItem key={getItemId(item)} value={getItemId(item)}>
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
