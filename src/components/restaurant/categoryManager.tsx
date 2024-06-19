import { Dot, Plus, Trash2 } from "lucide-react";
import { H3 } from "../typography";
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
  CategoryContentRestaurant,
  getItemId,
  isCategoryContent,
  isCategoryContentRestaurant,
  isMenu,
  isProduct,
} from "@/entities/categoryContent";
import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";
import { Button } from "../ui/button";

interface ItemRequiredValues {
  id: string;
  name: string;
  deleteItem: (id: string) => void;
}

const Item = ({ id, name, deleteItem }: ItemRequiredValues) => {
  console.log("item: ", name);
  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-3/4 flex items-center gap-2 p-2 border border-gray-300 rounded-md bg-white">
        <Dot />
        <p>{name}</p>
      </div>
      <Button
        className="flex gap-1 text-destructive"
        variant="outline"
        onClick={() => deleteItem(id)}
      >
        <Trash2 />
      </Button>
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

interface addProductCategoryType {
  id_restaurant_category: string;
  updateCategoryDto: {
    ids_product: Array<string>;
  };
}

interface addMenuCategoryType {
  id_restaurant_category: string;
  updateCategoryDto: {
    ids_menu: Array<string>;
  };
}

function iscategoryType(
  categoryToEdit: categoryType | addProductCategoryType | addMenuCategoryType
): categoryToEdit is categoryType {
  return (categoryToEdit as categoryType).id_category !== undefined;
}

function isAddMenuCategoryType(
  categoryToEdit: categoryType | addProductCategoryType | addMenuCategoryType
): categoryToEdit is addMenuCategoryType {
  return (
    (categoryToEdit as addMenuCategoryType).updateCategoryDto.ids_menu !==
    undefined
  );
}

function isAddProductCategoryType(
  categoryToEdit: categoryType | addProductCategoryType | addMenuCategoryType
): categoryToEdit is addProductCategoryType {
  return (
    (categoryToEdit as addProductCategoryType).updateCategoryDto.ids_product !==
    undefined
  );
}

interface CategoryManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  category: CategoryContent | CategoryContentRestaurant;
  allItemsList: Array<Menu | Product>;
  categoriesEdited: Array<
    categoryType | addProductCategoryType | addMenuCategoryType
  >;
  setCategoriesEdited: Dispatch<
    SetStateAction<
      Array<categoryType | addProductCategoryType | addMenuCategoryType>
    >
  >;
  data: Array<CategoryContent | CategoryContentRestaurant>;
  setData: Dispatch<
    SetStateAction<Array<CategoryContent | CategoryContentRestaurant>>
  >;
  categoriesDeleted: Array<string>;
  setCategoriesDeleted: Dispatch<SetStateAction<Array<string>>>;
}

export default function CategoryManager({
  category,
  allItemsList,
  categoriesEdited,
  setCategoriesEdited,
  data,
  setData,
  categoriesDeleted,
  setCategoriesDeleted,
}: CategoryManagerProps) {
  const [items, setItems] = useState<Array<Menu | Product>>(() => {
    if (isCategoryContent(category)) {
      console.log("isCategoryContent");
      return category.Product || [];
    } else if (isCategoryContentRestaurant(category)) {
      console.log("isCategoryContentRestaurant: ");
      return [...category.Products, ...category.Menus] || [];
    } else {
      return [];
    }
  });
  const [feedbackSelect, setfeedbackSelect] = useState<string | null>(null);

  useEffect(() => {
    // Whenever category changes, update the items state
    setItems(
      (category as CategoryContent).Product || [
        ...(category as CategoryContentRestaurant).Products,
        ...(category as CategoryContentRestaurant).Menus,
      ]
    );
  }, [category]);

  useEffect(() => {
    // Whenever category changes, update the items state
    console.log("items: ", items);
  }, [items]);

  function addItem(newId: string) {
    console.log("newId: ", newId);
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
      console.log("itemslist :", allItemsList);
      const newItem = allItemsList.find((item) => {
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
        if (isCategoryContent(category)) {
          // store category in local to send it when click on save
          category.ids_product.push(newItem.id_product);
          newItem.ids_menu_category.push(
            (category as CategoryContent).id_category
          );
          const categoryToEdit = {
            id_category: (category as CategoryContent).id_category,
            id_product: newItem.id_product,
            updateProductDto: {
              ids_menu_category: newItem.ids_menu_category,
            },
            updateCategoryDto: {
              ids_product: (category as CategoryContent).ids_product,
            },
          };
          console.log(categoryToEdit);
          // store edited category to process it when click on save button
          setCategoriesEdited([...categoriesEdited, categoryToEdit]);
        } else {
          (category as CategoryContentRestaurant).ids_product.push(
            newItem.id_product
          );
          const categoryToEdit: addProductCategoryType = {
            id_restaurant_category: (category as CategoryContentRestaurant)
              .id_restaurant_category,
            updateCategoryDto: {
              ids_product: (category as CategoryContentRestaurant).ids_product,
            },
          };
          setCategoriesEdited([...categoriesEdited, categoryToEdit]);
        }
      } else if (newItem !== undefined && isMenu(newItem)) {
        console.log("oui");
        setItems([
          ...items,
          {
            id_menu: newItem.id_menu,
            name: newItem.name,
            price: newItem.price,
            description: newItem.description,
            menu_image_url: newItem.menu_image_url,
            id_restaurant: newItem.id_restaurant,
            ids_menu_category: newItem.ids_menu_category,
            ids_restaurant_category: newItem.ids_restaurant_category,
          },
        ]);
        (category as CategoryContentRestaurant).ids_menu.push(newItem.id_menu);
        const categoryToEdit: addMenuCategoryType = {
          id_restaurant_category: (category as CategoryContentRestaurant)
            .id_restaurant_category,
          updateCategoryDto: {
            ids_menu: (category as CategoryContentRestaurant).ids_menu,
          },
        };
        setCategoriesEdited([...categoriesEdited, categoryToEdit]);
      }
      setfeedbackSelect("Item ajouté");
    } else {
      setfeedbackSelect("Item déjà dans la catégorie");
    }
  }

  function deleteCategory(
    categoryToDelete: CategoryContent | CategoryContentRestaurant
  ) {
    console.log("delete category", data);
    if (isCategoryContent(category)) {
      setData(
        data.filter((category) => {
          return category.id_category !== categoryToDelete.id_category;
        })
      );
      setCategoriesDeleted([...categoriesDeleted, category.id_category]);
    } else {
      setData(
        data.filter((categoryToDelete) => {
          return (
            (category as CategoryContentRestaurant).id_restaurant_category !==
            (categoryToDelete as CategoryContentRestaurant)
              .id_restaurant_category
          );
        })
      );
      setCategoriesDeleted([
        ...categoriesDeleted,
        category.id_restaurant_category,
      ]);
    }
  }

  function deleteItem(id: string) {
    if (isCategoryContent(category)) {
      var idProduct: string = "";
      var idsMenuCategory: Array<string> = [];
      var idsProduct: Array<string> = [];
      setItems(
        items.filter((item) => {
          if (isProduct(item)) {
            if (item.id_product !== id) {
              return true;
            } else {
              idProduct = item.id_product;
              idsMenuCategory = item.ids_menu_category.filter((idMenuCat) => {
                return idMenuCat !== category.id_category;
              });
              idsProduct = category.ids_product.filter((id_product) => {
                return id_product !== idProduct;
              });
              return false;
            }
          } else {
            return item.id_menu !== id;
          }
        })
      );
      console.log("idsMenuCategory: ", idsMenuCategory);
      console.log("category.ids_product: ", idsProduct);
      const categoryToEdit = {
        id_category: (category as CategoryContent).id_category,
        id_product: idProduct,
        updateProductDto: {
          ids_menu_category: idsMenuCategory,
        },
        updateCategoryDto: {
          ids_product: idsProduct,
        },
      };
      console.log("categoryToEdit: ", categoryToEdit);
      setCategoriesEdited([...categoriesEdited, categoryToEdit]);
    } else if (isCategoryContentRestaurant(category)) {
      var deletedItemIsProduct: boolean = false;
      var idsProduct: Array<string> = [];
      var idsMenu: Array<string> = [];
      setItems(
        items.filter((item) => {
          if (isProduct(item)) {
            if (item.id_product !== id) {
              return true;
            } else {
              const idProduct = item.id_product;
              idsProduct = category.ids_product.filter((id_product) => {
                return id_product !== idProduct;
              });
              deletedItemIsProduct = true;
              return false;
            }
          } else {
            if (item.id_menu !== id) {
              return true;
            } else {
              const idMenu = item.id_menu;
              idsMenu = category.ids_menu.filter((id_menu) => {
                return id_menu !== idMenu;
              });
              deletedItemIsProduct = false;
            }
          }
        })
      );
      console.log("after delete", items);
      if (deletedItemIsProduct) {
        const categoryToEdit: addProductCategoryType = {
          id_restaurant_category: category.id_restaurant_category,
          updateCategoryDto: {
            ids_product: idsProduct,
          },
        };
        setCategoriesEdited([...categoriesEdited, categoryToEdit]);
      } else {
        const categoryToEdit: addMenuCategoryType = {
          id_restaurant_category: category.id_restaurant_category,
          updateCategoryDto: {
            ids_menu: idsMenu,
          },
        };
        setCategoriesEdited([...categoriesEdited, categoryToEdit]);
      }
    }
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-center pt-2">
        <H3 className="pr-4">{category.name}</H3>
        <Button
          className="flex gap-1"
          variant="destructive"
          onClick={() => deleteCategory(category)}
        >
          <Trash2 />
        </Button>
      </div>
      {items.map((item) => (
        <div key={getItemId(item)} className="w-full flex justify-start">
          <Item
            id={getItemId(item)}
            name={item.name}
            deleteItem={() => deleteItem(getItemId(item))}
          />
        </div>
      ))}

      <div className="w-3/4">
        <Select value="" onValueChange={addItem}>
          <SelectTrigger>
            <Plus className="text-accent" />
            <SelectValue placeholder="Ajouter Item" />
          </SelectTrigger>
          <SelectContent>
            {allItemsList.map((item) => (
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
