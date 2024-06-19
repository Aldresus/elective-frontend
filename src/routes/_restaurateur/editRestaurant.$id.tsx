import CategoryManager from "@/components/restaurant/categoryManager";
import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CategoryContent,
  CategoryContentRestaurant,
} from "@/entities/categoryContent";
import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";
import { axiosInstance } from "@/lib/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, Save } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_restaurateur/editRestaurant/$id")({
  component: RestaurantManager,
});

const restaurantSchema = z.object({
  name: z.string().min(1, { message: "Veillez renseigner le champ." }),
  siret: z.string().length(14, {
    message: "Le numéro de SIRET doit faire exactement 14 caractères.",
  }),
  image: z.any(),
  price_range: z.string().min(1, { message: "Veillez renseigner le champ." }),
});

interface restaurantDataType {
  name: string;
  siret: string;
  banner_url: string;
  price_range: string;
}

// should never use it
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

// function iscategoryType(
//   categoryToEdit: categoryType | addProductCategoryType | addMenuCategoryType
// ): categoryToEdit is categoryType {
//   return (categoryToEdit as categoryType).id_category !== undefined;
// }

// function isAddMenuCategoryType(
//   categoryToEdit: categoryType | addProductCategoryType | addMenuCategoryType
// ): categoryToEdit is addMenuCategoryType {
//   return (
//     (categoryToEdit as addMenuCategoryType).updateCategoryDto.ids_menu !==
//     undefined
//   );
// }

function isAddProductCategoryType(
  categoryToEdit: categoryType | addProductCategoryType | addMenuCategoryType
): categoryToEdit is addProductCategoryType {
  return (
    (categoryToEdit as addProductCategoryType).updateCategoryDto.ids_product !==
    undefined
  );
}

function RestaurantManager() {
  const [data, setData] = useState<
    Array<CategoryContent | CategoryContentRestaurant>
  >([]);
  const [itemsList, setItemsList] = useState<Array<Menu | Product>>([]);
  const [restaurantData, setRestaurantData] = useState<restaurantDataType>({
    name: "",
    siret: "",
    banner_url: "",
    price_range: "",
  });
  const [displayCategory, setdisplayCategory] = useState<Boolean>(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoriesEdited, setCategoriesEdited] = useState<
    Array<addProductCategoryType | addMenuCategoryType | categoryType>
  >([]);
  const [categoriesDeleted, setCategoriesDeleted] = useState<Array<string>>([]);

  const { id } = Route.useParams();

  useQuery({
    queryKey: ["getRestaurantCategories", id],
    queryFn: async () => {
      const rawData = await axiosInstance().get(`/restaurant/${id}`);

      const finalData = (await rawData).data.Restaurant_Categories;
      console.log("finalData :", finalData);

      console.log(rawData.data);

      setData(finalData);

      setRestaurantData({
        name: rawData.data.name,
        siret: rawData.data.siret,
        banner_url: rawData.data.banner_url,
        price_range: rawData.data.price_range,
      });

      return finalData;
    },
  });

  const idRestaurant: string = "6671ed6ebc8bbd71f1ad0285"; // todo: dynamik
  //Get all products of restaurant
  useQuery({
    queryKey: ["RestaurantProducts", idRestaurant],
    queryFn: async () => {
      const rawData = axiosInstance().get(
        `/product?id_restaurant=${idRestaurant}`
      );

      const productsData = (await rawData).data;

      for (var product of productsData) {
        const itemInList: Product = {
          id_product: product.id_product,
          name: product.name,
          price: product.price,
          description: product.description,
          product_image_url: product.product_image_url,
          id_restaurant: product.id_restaurant,
          ids_menu_category: product.ids_menu_category,
        };
        setItemsList((itemsList) => [...itemsList, itemInList]);
      }
      return productsData;
    },
  });

  //Get all menus of restaurant
  useQuery({
    queryKey: ["RestaurantMenus", idRestaurant],
    queryFn: async () => {
      const rawData = axiosInstance().get(
        `/menu?id_restaurant=${idRestaurant}`
      );

      const menusData = (await rawData).data;
      console.log("menusData: ", menusData);

      for (var product of menusData) {
        const itemInList: Menu = {
          id_menu: product.id_menu,
          name: product.name,
          price: product.price,
          description: product.description,
          menu_image_url: product.menu_image_url,
          id_restaurant: product.id_restaurant,
          ids_menu_category: product.ids_menu_category,
          ids_restaurant_category: product.ids_restaurant_category,
        };
        setItemsList((itemsList) => [...itemsList, itemInList]);
      }
      return menusData;
    },
  });

  useEffect(() => {
    console.log("itemsList: ", itemsList);
  }, [itemsList]);

  const form = useForm<z.infer<typeof restaurantSchema>>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: restaurantData.name,
      siret: restaurantData.siret,
      image: restaurantData.banner_url,
      price_range: restaurantData.price_range,
    },
  });

  const { reset } = form;

  useEffect(() => {
    console.log(restaurantData);
    reset({
      name: restaurantData.name,
      siret: restaurantData.siret,
      image: "",
      price_range: restaurantData.price_range,
    });
  }, [restaurantData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const onCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoryName.trim() === "") return;

    const createdCategory = {
      name: categoryName,
      id_restaurant: id,
      ids_product: [],
      ids_menu: [],
    };

    axiosInstance()
      .post("/restaurant/restaurantCategory", createdCategory)
      .then((res) => {
        console.log("Category created");
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Failed creation category");
        console.log(err);
      });

    setCategoryName("");
    setdisplayCategory(false);
  };

  const onSubmit = async (values: z.infer<typeof restaurantSchema>) => {
    axiosInstance()
      .patch(`restaurant/${id}`, {
        name: values.name,
        siret: values.siret,
        banner_url: "",
        price_range: values.price_range,
      })
      .then((res) => {
        console.log("Insertion réussie");
        console.log(res);
      })
      .catch((err) => {
        console.log("Failed");
        console.log(err);
      });

    categoriesEdited.map((editedCategory) => {
      if (isAddProductCategoryType(editedCategory)) {
        axiosInstance()
          .patch(`/restaurant/addProductCategory`, editedCategory)
          .then((res) => {
            console.log("Successfull edited product category");
            console.log(res);
          })
          .catch((err) => {
            console.log("Categories Failed");
            console.log(err);
          });
      } else {
        axiosInstance()
          .patch(`/restaurant/addMenuCategory`, editedCategory)
          .then((res) => {
            console.log("Successfull edited menu category");
            console.log(res);
          })
          .catch((err) => {
            console.log("Categories Failed");
            console.log(err);
          });
      }
    });

    categoriesDeleted.map((deletedCategory) => {
      axiosInstance()
        .delete(`/restaurant/category/${deletedCategory}`)
        .then((res) => {
          console.log("Successfull deleted category");
          console.log(res);
        })
        .catch((err) => {
          console.log("Failed deleted category");
          console.log(err);
        });
    });
  };

  console.log("data :", data);
  return (
    <div className="h-full w-full">
      <H1 className="pb-2">Restaurant Manager</H1>
      <div className="h-full w-full flex flex-col gap-4 pb-52 overflow-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Name"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="siret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SIRET</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="SIRET"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      placeholder="Select an image"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Prix moyen (€)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-[82%] fixed bottom-14" type="submit">
              <Save />
              Enregistrer
            </Button>
          </form>
        </Form>
        {data.map((category) => (
          <div
            key={(category as CategoryContentRestaurant).id_restaurant_category}
          >
            <Separator />
            <CategoryManager
              category={category}
              allItemsList={itemsList}
              categoriesEdited={categoriesEdited}
              setCategoriesEdited={setCategoriesEdited}
              data={data}
              setData={setData}
              categoriesDeleted={categoriesDeleted}
              setCategoriesDeleted={setCategoriesDeleted}
            />
          </div>
        ))}
        {displayCategory && (
          <form onSubmit={onCategorySubmit}>
            <div>
              <p>Ajouter catégorie</p>
              <div className="flex items-center justify-between">
                <Input
                  name="category"
                  type="text"
                  placeholder="Category Name"
                  className="w-4/5"
                  value={categoryName}
                  onChange={handleInputChange}
                />
                <Button className="flex gap-1" type="submit">
                  <Plus />
                </Button>
              </div>
            </div>
          </form>
        )}

        <Button
          className="w-full flex gap-1"
          variant="outline"
          onClick={() => setdisplayCategory(!displayCategory)}
        >
          {!displayCategory && (
            <>
              <Plus />
              Add Category
            </>
          )}
          {displayCategory && (
            <>
              <Minus />
              Annuler
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
