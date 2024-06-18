import { GripVertical, Plus, Trash2 } from "lucide-react";
import { H3 } from "../typography";
import { Active } from "@dnd-kit/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { Console } from "console";

interface ItemRequiredValues {
  id: string;
  name: string;
}

const Item = ({ id, name }: ItemRequiredValues) => {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-3/4 flex items-center gap-2 p-2 border border-gray-300 rounded-md bg-white">
        <GripVertical />
        <p>{name}</p>
      </div>
      <Trash2 className="text-destructive" />
    </div>
  );
};

interface categoryType {
  id_product: string;
  id_category: string;
  updateProductDto: {
    ids_menu_category: Array<string>;
  };
  updateCategoryDto: {
    ids_product: Array<string>;
  };
}

interface CategoryManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  category: CategoryContent;
  allItemsList: Array<Menu | Product>;
  categoriesEdited: Array<categoryType>;
  setCategoriesEdited: Dispatch<SetStateAction<Array<categoryType>>>;
}

export default function CategoryManager({
  category,
  allItemsList,
  categoriesEdited,
  setCategoriesEdited,
}: CategoryManagerProps) {
  const [itemsList, setitemsList] =
    useState<Array<Menu | Product>>(allItemsList);
  const [items, setItems] = useState<Array<Menu | Product>>(
    category.Product || []
  );
  const [feedbackSelect, setfeedbackSelect] = useState<string | null>(null);

  useEffect(() => {
    // Whenever category changes, update the items state
    setItems(category.Product || []);
  }, [category]);

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
      console.log("itemslist :", itemsList);
      const newItem = itemsList.find((item) => {
        if (isProduct(item)) {
          return item.id_product === newId;
        } else {
          return item.id_menu === newId;
        }
      });
      console.log("newItem :", newItem);
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
            id_restaurant: newItem.id_restaurant,
            ids_menu_category: newItem.ids_menu_category,
          },
        ]);
        // edit category
        category.ids_product.push(newItem.id_product);
        newItem.ids_menu_category.push(category.id_category);
        console.log("ids_product: ", category.ids_product);
        console.log("ids_menu_category: ", newItem.ids_menu_category);
        const categoryToEdit = {
          id_category: category.id_category,
          id_product: newItem.id_product,
          updateProductDto: {
            ids_menu_category: newItem.ids_menu_category,
          },
          updateCategoryDto: {
            ids_product: category.ids_product,
          },
        };
        console.log(categoryToEdit);
        // store edited category to process it when click on save button
        setCategoriesEdited([...categoriesEdited, categoryToEdit]);
      } else if (newItem !== undefined && isMenu(newItem)) {
        /*setItems([
          ...items,
          {
            id_menu: newItem.id_menu,
            name: newItem.name,
            description: newItem.description,
            menu_image_url: newItem.menu_image_url,
            price: newItem.price,
          },
        ]);*/
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

  console.log("items");
  console.log(items);
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between items-center pt-2">
        <H3>{category.name}</H3>
      </div>
      {items.map((item) => (
        <div key={getItemId(item)} className="w-full flex justify-start">
          <Item id={getItemId(item)} name={item.name} />
        </div>
      ))}

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
